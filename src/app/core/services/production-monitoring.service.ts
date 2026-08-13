import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ShiftCards, ScanDetailRow, Pagination } from '../models/production-monitoring.model';


interface ApiResult<T> {
  success: boolean;
  data: T;
  pagination?: Pagination;
}

@Injectable({ providedIn: 'root' })
export class ProductionMonitoringService {
  private readonly base = `${environment.apiUrl}/production-monitoring`;

  constructor(private http: HttpClient) {}

  getSummary(department: string): Observable<ShiftCards> {
    return this.http
      .get<ApiResult<ShiftCards>>(`${this.base}/${encodeURIComponent(department)}/summary`)
      .pipe(map(res => res.data));
  }

  getDetails(
    department: string,
    opts: { search?: string; page?: number; limit?: number } = {}
  ): Observable<{ rows: ScanDetailRow[]; pagination: Pagination | undefined }> {
    let params = new HttpParams();
    if (opts.search) params = params.set('search', opts.search);
    if (opts.page) params = params.set('page', opts.page);
    if (opts.limit) params = params.set('limit', opts.limit);

    return this.http
      .get<ApiResult<ScanDetailRow[]>>(`${this.base}/${encodeURIComponent(department)}/details`, { params })
      .pipe(map(res => ({ rows: res.data, pagination: res.pagination })));
  }
}
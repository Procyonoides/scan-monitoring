import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ProductionMonitoringService } from '../../../core/services/production-monitoring.service';
import { SocketService } from '../../../core/services/socket.service';
import { ShiftCards, ScanDetailRow, Pagination, DashboardUpdateEvent } from '../../../core/models/production-monitoring.model';
import { ShiftSummaryTableComponent } from '../components/shift-summary-table/shift-summary-table.component';
import { ScanDetailTableComponent } from '../components/scan-detail-table/scan-detail-table.component';

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, RouterLink, ShiftSummaryTableComponent, ScanDetailTableComponent],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent implements OnInit, OnDestroy {
  department = '';
  connected = false;

  summaryCards: ShiftCards | null = null;
  summaryLoading = true;

  detailRows: ScanDetailRow[] = [];
  detailPagination?: Pagination;
  detailLoading = true;

  currentLimit = 10;
  private currentSearch = '';
  private currentPage = 1;

  // Batches rapid 'dashboard:update' bursts (e.g. batch scan) into one refetch.
  private refetch$ = new Subject<void>();
  private subs: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private monitoringService: ProductionMonitoringService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.department = (this.route.snapshot.paramMap.get('department') || '').toUpperCase();

    this.loadSummary();
    this.loadDetails();

    this.socketService.connect();
    this.subs.push(
      this.socketService.status$.subscribe(status => (this.connected = status))
    );
    this.subs.push(
      this.socketService.on<DashboardUpdateEvent>('dashboard:update').subscribe(() => {
        this.refetch$.next();
      })
    );
    this.subs.push(
      this.refetch$.pipe(debounceTime(500)).subscribe(() => {
        this.loadSummary();
        this.loadDetails();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  onSearchChange(term: string): void {
    this.currentSearch = term;
    this.currentPage = 1;
    this.loadDetails();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadDetails();
  }

  onLimitChange(limit: number): void {
    this.currentLimit = limit;
    this.currentPage = 1;
    this.loadDetails();
  }

  private loadSummary(): void {
    this.summaryLoading = true;
    this.monitoringService.getSummary(this.department).subscribe({
      next: cards => {
        this.summaryCards = cards;
        this.summaryLoading = false;
      },
      error: () => (this.summaryLoading = false)
    });
  }

  private loadDetails(): void {
    this.detailLoading = true;
    this.monitoringService
      .getDetails(this.department, { search: this.currentSearch, page: this.currentPage, limit: this.currentLimit })
      .subscribe({
        next: ({ rows, pagination }) => {
          this.detailRows = rows;
          this.detailPagination = pagination;
          this.detailLoading = false;
        },
        error: () => (this.detailLoading = false)
      });
  }
}
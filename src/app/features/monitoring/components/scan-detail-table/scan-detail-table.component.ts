import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ScanDetailRow, Pagination } from '../../../../core/models/production-monitoring.model';


@Component({
  selector: 'app-scan-detail-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './scan-detail-table.component.html',
  styleUrl: './scan-detail-table.component.scss'
})
export class ScanDetailTableComponent implements OnDestroy {
   @Input() rows: ScanDetailRow[] = [];
  @Input() pagination?: Pagination;
  @Input() loading = false;

  @Output() searchChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  search = '';

  private search$ = new Subject<string>();
  private sub: Subscription;

  constructor() {
    this.sub = this.search$
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(term => this.searchChange.emit(term));
  }

  onSearchInput(): void {
    this.search$.next(this.search.trim());
  }

  goToPage(page: number): void {
    if (!this.pagination) return;
    if (page < 1 || page > this.pagination.totalPages) return;
    this.pageChange.emit(page);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

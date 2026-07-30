import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftSummaryRow } from '../../../../core/models/production-monitoring.model';


@Component({
  selector: 'app-shift-summary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-summary-table.component.html',
  styleUrl: './shift-summary-table.component.scss'
})
export class ShiftSummaryTableComponent {
  @Input() rows: ShiftSummaryRow[] = [];
  @Input() loading = false;

}

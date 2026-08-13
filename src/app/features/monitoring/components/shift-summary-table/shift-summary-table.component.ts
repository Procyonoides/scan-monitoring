import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftCards } from '../../../../core/models/production-monitoring.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-shift-summary-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shift-summary-table.component.html',
  styleUrl: './shift-summary-table.component.scss'
})
export class ShiftSummaryTableComponent {
  @Input() department = '';
  @Input() cards: ShiftCards | null = null;
  @Input() loading = false;

  get shiftOrder(): Array<keyof ShiftCards> {
    return ['Pagi', 'Siang', 'Malam'];
  }

  printShift(shift: keyof ShiftCards): void {
    const username = this.cards?.[shift]?.username;
    if (!username) return; // nothing to print if no one's assigned to this shift

    const url = `${environment.apiUrl}/production-monitoring/${encodeURIComponent(this.department)}/print-shift`
      + `?shift=${encodeURIComponent(shift)}&username=${encodeURIComponent(username)}`;
    window.open(url, '_blank');
  }
}
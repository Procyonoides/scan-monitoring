import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-select',
  standalone: true,
  imports: [],
  templateUrl: './department-select.component.html',
  styleUrl: './department-select.component.scss'
})
export class DepartmentSelectComponent {
  // Grouped by row so the layout can be 2-1-2 instead of an auto-wrapping grid.
  readonly departmentRows: string[][] = [
    ['RUBBER', 'GOODSOLE'],
    ['IP'],
    ['PHYLON', 'BLOKER']
  ];

  constructor(private router: Router) {}

  open(department: string): void {
    this.router.navigate(['/', department]);
  }
}
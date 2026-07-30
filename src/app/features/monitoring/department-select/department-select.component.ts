import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './department-select.component.html',
  styleUrl: './department-select.component.scss'
})
export class DepartmentSelectComponent {
  department = '';
  constructor(private router: Router) {}
  go(): void {
    const dep = this.department.trim().toUpperCase();
    if (dep) this.router.navigate(['/', dep]);
  }

}

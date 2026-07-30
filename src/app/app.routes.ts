import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () =>
        import('./features/monitoring/department-select/department-select.component')
            .then(m => m.DepartmentSelectComponent)
    },
    {
        path: ':department',
        loadComponent: () =>
        import('./features/monitoring/monitoring/monitoring.component')
            .then(m => m.MonitoringComponent)
    }
];

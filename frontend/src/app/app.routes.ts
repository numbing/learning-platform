import { Routes } from '@angular/router';
import { ModuleListComponent } from './features/learning-modules/components/module-list/module-list.component';

export const routes: Routes = [
  {
    path: '',
    component: ModuleListComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

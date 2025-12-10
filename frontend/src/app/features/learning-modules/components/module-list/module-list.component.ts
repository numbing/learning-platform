import { Component, OnInit, OnDestroy, inject } from '@angular/core';

import { catchError, finalize, of, Subject, takeUntil } from 'rxjs';
import { ModulesApiService } from '../../services/modules-api.service';
import { ModulesStateService } from '../../services/modules-state.service';
import { ErrorHandlerService } from '../../../../core/services/error-handler.service';
import { Category } from '../../models/category.enum';
import { ModuleItemComponent } from '../module-item/module-item.component';
import { ProgressSummaryComponent } from '../progress-summary/progress-summary.component';
import { CategoryFilterComponent } from '../category-filter/category-filter.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../error-alert/error-alert.component';

@Component({
    selector: 'app-module-list',
    imports: [
    ModuleItemComponent,
    ProgressSummaryComponent,
    CategoryFilterComponent,
    LoadingSpinnerComponent,
    ErrorAlertComponent
],
    templateUrl: './module-list.component.html',
    styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit, OnDestroy {
  private readonly apiService = inject(ModulesApiService);
  private readonly stateService = inject(ModulesStateService);
  private readonly errorHandler = inject(ErrorHandlerService);
  private readonly destroy$ = new Subject<void>();

  readonly modules = this.stateService.modules;
  readonly loading = this.stateService.loading;
  readonly error = this.stateService.error;
  readonly progress = this.stateService.progress;

  private selectedCategory: Category | null = null;

  ngOnInit(): void {
    this.loadModules();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCategoryChange(category: Category | null): void {
    this.selectedCategory = category;
    this.loadModules();
  }

  onCompletionToggle(event: { id: string; completed: boolean }): void {
    // Optimistic update - update UI immediately
    const optimisticModule = this.modules().find(m => m.id === event.id);
    if (optimisticModule) {
      const updatedModule = { ...optimisticModule, completed: event.completed };
      this.stateService.updateModule(updatedModule);
    }

    // Send request to backend
    this.apiService
      .updateModuleCompletion(event.id, event.completed)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          // Revert optimistic update on error
          if (optimisticModule) {
            this.stateService.updateModule(optimisticModule);
          }
          const errorMessage = this.errorHandler.handleError(error);
          this.stateService.setError(errorMessage);
          return of(null);
        }),
      )
      .subscribe((updatedModule) => {
        // Confirm with server response
        if (updatedModule) {
          this.stateService.updateModule(updatedModule);
        }
      });
  }

  onErrorDismiss(): void {
    this.stateService.clearError();
  }

  private loadModules(): void {
    this.stateService.setLoading(true);
    this.stateService.clearError();

    const request$ = this.selectedCategory
      ? this.apiService.getModulesByCategory(this.selectedCategory)
      : this.apiService.getAllModules();

    request$
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          const errorMessage = this.errorHandler.handleError(error);
          this.stateService.setError(errorMessage);
          return of([]);
        }),
        finalize(() => this.stateService.setLoading(false)),
      )
      .subscribe((modules) => {
        this.stateService.setModules(modules);
      });
  }
}

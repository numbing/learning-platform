import { Injectable, signal, computed } from '@angular/core';
import { LearningModule } from '../models/learning-module.model';
import { ModuleProgress } from '../models/module-progress.model';
import { calculateProgress } from '../utils/calculate-progress.util';

@Injectable({
  providedIn: 'root',
})
export class ModulesStateService {
  private readonly modulesSignal = signal<LearningModule[]>([]);
  private readonly loadingSignal = signal<boolean>(false);
  private readonly errorSignal = signal<string | null>(null);

  readonly modules = this.modulesSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  readonly progress = computed<ModuleProgress>(() => {
    return calculateProgress(this.modulesSignal());
  });

  setModules(modules: LearningModule[]): void {
    this.modulesSignal.set(modules);
  }

  updateModule(updatedModule: LearningModule): void {
    const currentModules = this.modulesSignal();
    const updatedModules = currentModules.map(module =>
      module.id === updatedModule.id ? updatedModule : module,
    );
    this.modulesSignal.set(updatedModules);
  }

  setLoading(loading: boolean): void {
    this.loadingSignal.set(loading);
  }

  setError(error: string | null): void {
    this.errorSignal.set(error);
  }

  clearError(): void {
    this.errorSignal.set(null);
  }
}

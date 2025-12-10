import { LearningModule } from '../models/learning-module.model';
import { Category } from '../models/category.enum';

export function filterModules(modules: LearningModule[], category: Category | null): LearningModule[] {
  if (!category) {
    return modules;
  }

  return modules.filter(module => module.category === category);
}

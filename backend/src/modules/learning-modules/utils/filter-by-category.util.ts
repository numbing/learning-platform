import { LearningModule, ModuleCategory } from '../interfaces/learning-module.interface';

export function filterByCategory(
  modules: LearningModule[],
  category: ModuleCategory,
): LearningModule[] {
  return modules.filter((module) => module.category === category);
}

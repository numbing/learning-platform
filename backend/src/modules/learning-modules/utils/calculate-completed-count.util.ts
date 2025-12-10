import { LearningModule } from '../interfaces/learning-module.interface';

export function calculateCompletedCount(modules: LearningModule[]): number {
  return modules.filter((module) => module.completed).length;
}

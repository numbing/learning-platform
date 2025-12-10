import { LearningModule } from '../models/learning-module.model';
import { ModuleProgress } from '../models/module-progress.model';

export function calculateProgress(modules: LearningModule[]): ModuleProgress {
  const totalModules = modules.length;
  const completedModules = modules.filter(module => module.completed).length;
  const completionPercentage = totalModules === 0
    ? 0
    : Math.round((completedModules / totalModules) * 100);

  return {
    totalModules,
    completedModules,
    completionPercentage,
  };
}

import { Injectable } from '@nestjs/common';
import { LearningModule } from '../interfaces/learning-module.interface';
import { ModuleProgress } from '../interfaces/module-progress.interface';
import { calculateCompletedCount } from '../utils/calculate-completed-count.util';
import { calculateCompletionPercentage } from '../utils/calculate-completion-percentage.util';

@Injectable()
export class LearningModulesBusinessService {
  calculateProgress(modules: LearningModule[]): ModuleProgress {
    const totalModules = modules.length;
    const completedModules = calculateCompletedCount(modules);
    const completionPercentage = calculateCompletionPercentage(
      completedModules,
      totalModules,
    );

    return {
      totalModules,
      completedModules,
      completionPercentage,
    };
  }

  validateCompletionStatus(completed: boolean): boolean {
    return typeof completed === 'boolean';
  }
}

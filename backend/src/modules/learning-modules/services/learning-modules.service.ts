import { Injectable } from '@nestjs/common';
import { LearningModulesRepository } from '../repositories/learning-modules.repository';
import { LearningModule, ModuleCategory } from '../interfaces/learning-module.interface';
import { ModuleNotFoundException } from '../exceptions/module-not-found.exception';

@Injectable()
export class LearningModulesService {
  constructor(
    private readonly repository: LearningModulesRepository,
  ) {}

  async getAllModules(): Promise<LearningModule[]> {
    return this.repository.findAll();
  }

  async getModulesByCategory(category: ModuleCategory): Promise<LearningModule[]> {
    return this.repository.findByCategory(category);
  }

  async updateModuleCompletion(
    moduleId: string,
    completed: boolean,
  ): Promise<LearningModule> {
    const updatedModule = await this.repository.update(moduleId, { completed });

    if (!updatedModule) {
      throw new ModuleNotFoundException(moduleId);
    }

    return updatedModule;
  }
}

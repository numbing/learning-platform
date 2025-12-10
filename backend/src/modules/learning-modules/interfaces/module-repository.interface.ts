import { Repository } from '../../../common/interfaces/repository.interface';
import { LearningModule, ModuleCategory } from './learning-module.interface';

export interface ModuleRepository extends Repository<LearningModule> {
  findByCategory(category: ModuleCategory): Promise<LearningModule[]>;
}

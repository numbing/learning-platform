import { LearningModule, ModuleCategory } from '../interfaces/learning-module.interface';

export class ModuleResponseDto {
  id!: string;
  title!: string;
  category!: ModuleCategory;
  estimatedMinutes!: number;
  completed!: boolean;

  static fromDomain(module: LearningModule): ModuleResponseDto {
    const dto = new ModuleResponseDto();
    dto.id = module.id;
    dto.title = module.title;
    dto.category = module.category;
    dto.estimatedMinutes = module.estimatedMinutes;
    dto.completed = module.completed;
    return dto;
  }

  static fromDomainArray(modules: LearningModule[]): ModuleResponseDto[] {
    return modules.map((module) => ModuleResponseDto.fromDomain(module));
  }
}

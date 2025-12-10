import { IsOptional, IsIn } from 'class-validator';
import { ModuleCategory } from '../interfaces/learning-module.interface';

export class ModuleQueryDto {
  @IsOptional()
  @IsIn(['AI', 'Sustainability', 'Digital Skills'])
  category?: ModuleCategory;
}

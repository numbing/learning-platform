import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateModuleDto {
  @IsBoolean()
  @IsNotEmpty()
  completed!: boolean;
}

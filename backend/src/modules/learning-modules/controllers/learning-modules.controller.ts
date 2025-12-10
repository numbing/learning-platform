import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { LearningModulesService } from '../services/learning-modules.service';
import { UpdateModuleDto } from '../dto/update-module.dto';
import { ModuleQueryDto } from '../dto/module-query.dto';
import { ModuleResponseDto } from '../dto/module-response.dto';

@Controller('api/modules')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class LearningModulesController {
  constructor(private readonly learningModulesService: LearningModulesService) {}

  @Get()
  async getAllModules(
    @Query() query: ModuleQueryDto,
  ): Promise<ModuleResponseDto[]> {
    if (query.category) {
      const modules = await this.learningModulesService.getModulesByCategory(
        query.category,
      );
      return ModuleResponseDto.fromDomainArray(modules);
    }

    const modules = await this.learningModulesService.getAllModules();
    return ModuleResponseDto.fromDomainArray(modules);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async updateModuleCompletion(
    @Param('id') id: string,
    @Body() updateModuleDto: UpdateModuleDto,
  ): Promise<ModuleResponseDto> {
    const updatedModule = await this.learningModulesService.updateModuleCompletion(
      id,
      updateModuleDto.completed,
    );

    return ModuleResponseDto.fromDomain(updatedModule);
  }
}

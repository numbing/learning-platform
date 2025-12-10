import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningModuleEntity, LearningModuleSchema } from './schemas/learning-module.schema';
import { LearningModulesController } from './controllers/learning-modules.controller';
import { LearningModulesService } from './services/learning-modules.service';
import { LearningModulesBusinessService } from './services/learning-modules-business.service';
import { LearningModulesRepository } from './repositories/learning-modules.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: LearningModuleEntity.name, schema: LearningModuleSchema },
    ]),
  ],
  controllers: [LearningModulesController],
  providers: [
    LearningModulesService,
    LearningModulesBusinessService,
    LearningModulesRepository,
  ],
  exports: [LearningModulesService],
})
export class LearningModulesModule {}

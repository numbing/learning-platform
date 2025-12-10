import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LearningModuleEntity, LearningModuleDocument } from '../schemas/learning-module.schema';
import { ModuleRepository } from '../interfaces/module-repository.interface';
import { LearningModule, ModuleCategory } from '../interfaces/learning-module.interface';

@Injectable()
export class LearningModulesRepository implements ModuleRepository {
  constructor(
    @InjectModel(LearningModuleEntity.name)
    private readonly moduleModel: Model<LearningModuleDocument>,
  ) {}

  async findAll(): Promise<LearningModule[]> {
    const documents = await this.moduleModel.find().exec();
    return documents.map(this.mapToLearningModule);
  }

  async findByCategory(category: ModuleCategory): Promise<LearningModule[]> {
    const documents = await this.moduleModel.find({ category }).exec();
    return documents.map(this.mapToLearningModule);
  }

  async findById(id: string): Promise<LearningModule | null> {
    const document = await this.moduleModel.findById(id).exec();

    if (!document) {
      return null;
    }

    return this.mapToLearningModule(document);
  }

  async update(id: string, data: Partial<LearningModule>): Promise<LearningModule | null> {
    const document = await this.moduleModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();

    if (!document) {
      return null;
    }

    return this.mapToLearningModule(document);
  }

  private mapToLearningModule(document: LearningModuleDocument): LearningModule {
    return {
      id: document._id.toString(),
      title: document.title,
      category: document.category as ModuleCategory,
      estimatedMinutes: document.estimatedMinutes,
      completed: document.completed,
    };
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LearningModuleDocument = LearningModuleEntity & Document;

@Schema({ collection: 'learning_modules', timestamps: true })
export class LearningModuleEntity {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true, enum: ['AI', 'Sustainability', 'Digital Skills'] })
  category!: string;

  @Prop({ required: true, min: 1 })
  estimatedMinutes!: number;

  @Prop({ required: true, default: false })
  completed!: boolean;
}

export const LearningModuleSchema = SchemaFactory.createForClass(
  LearningModuleEntity,
);

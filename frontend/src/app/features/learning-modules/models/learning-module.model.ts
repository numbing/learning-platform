import { Category } from './category.enum';

export interface LearningModule {
  id: string;
  title: string;
  category: Category;
  estimatedMinutes: number;
  completed: boolean;
}

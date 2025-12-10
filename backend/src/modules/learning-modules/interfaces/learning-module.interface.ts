export interface LearningModule {
  id: string;
  title: string;
  category: ModuleCategory;
  estimatedMinutes: number;
  completed: boolean;
}

export type ModuleCategory = 'AI' | 'Sustainability' | 'Digital Skills';

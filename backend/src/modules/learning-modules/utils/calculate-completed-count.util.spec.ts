import { calculateCompletedCount } from './calculate-completed-count.util';
import { LearningModule } from '../interfaces/learning-module.interface';

describe('calculateCompletedCount', () => {
  it('should return 0 for empty array', () => {
    const result = calculateCompletedCount([]);
    expect(result).toBe(0);
  });

  it('should return 0 when no modules are completed', () => {
    const modules: LearningModule[] = [
      { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: false },
      { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: false },
    ];

    const result = calculateCompletedCount(modules);
    expect(result).toBe(0);
  });

  it('should return total count when all modules are completed', () => {
    const modules: LearningModule[] = [
      { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: true },
      { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: true },
      { id: '3', title: 'Module 3', category: 'AI', estimatedMinutes: 60, completed: true },
    ];

    const result = calculateCompletedCount(modules);
    expect(result).toBe(3);
  });

  it('should return correct count when some modules are completed', () => {
    const modules: LearningModule[] = [
      { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: true },
      { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: false },
      { id: '3', title: 'Module 3', category: 'AI', estimatedMinutes: 60, completed: true },
      { id: '4', title: 'Module 4', category: 'AI', estimatedMinutes: 20, completed: false },
    ];

    const result = calculateCompletedCount(modules);
    expect(result).toBe(2);
  });

  it('should handle single completed module', () => {
    const modules: LearningModule[] = [
      { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: true },
    ];

    const result = calculateCompletedCount(modules);
    expect(result).toBe(1);
  });

  it('should handle single incomplete module', () => {
    const modules: LearningModule[] = [
      { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: false },
    ];

    const result = calculateCompletedCount(modules);
    expect(result).toBe(0);
  });
});

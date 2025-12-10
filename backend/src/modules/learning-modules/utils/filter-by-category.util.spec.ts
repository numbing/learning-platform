import { filterByCategory } from './filter-by-category.util';
import { LearningModule } from '../interfaces/learning-module.interface';

describe('filterByCategory', () => {
  const modules: LearningModule[] = [
    { id: '1', title: 'AI Basics', category: 'AI', estimatedMinutes: 30, completed: false },
    { id: '2', title: 'Green Energy', category: 'Sustainability', estimatedMinutes: 45, completed: false },
    { id: '3', title: 'Machine Learning', category: 'AI', estimatedMinutes: 60, completed: true },
    { id: '4', title: 'Web Development', category: 'Digital Skills', estimatedMinutes: 90, completed: false },
    { id: '5', title: 'Climate Change', category: 'Sustainability', estimatedMinutes: 40, completed: true },
  ];

  it('should return empty array for empty input', () => {
    const result = filterByCategory([], 'AI');
    expect(result).toEqual([]);
  });

  it('should filter modules by AI category', () => {
    const result = filterByCategory(modules, 'AI');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('AI Basics');
    expect(result[1].title).toBe('Machine Learning');
  });

  it('should filter modules by Sustainability category', () => {
    const result = filterByCategory(modules, 'Sustainability');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Green Energy');
    expect(result[1].title).toBe('Climate Change');
  });

  it('should filter modules by Digital Skills category', () => {
    const result = filterByCategory(modules, 'Digital Skills');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Web Development');
  });

  it('should return empty array when no modules match category', () => {
    const limitedModules: LearningModule[] = [
      { id: '1', title: 'AI Basics', category: 'AI', estimatedMinutes: 30, completed: false },
    ];

    const result = filterByCategory(limitedModules, 'Sustainability');
    expect(result).toEqual([]);
  });

  it('should not modify original array', () => {
    const originalLength = modules.length;
    filterByCategory(modules, 'AI');
    expect(modules).toHaveLength(originalLength);
  });
});

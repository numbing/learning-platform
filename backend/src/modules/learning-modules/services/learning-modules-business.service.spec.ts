import { Test, TestingModule } from '@nestjs/testing';
import { LearningModulesBusinessService } from './learning-modules-business.service';
import { LearningModule } from '../interfaces/learning-module.interface';

describe('LearningModulesBusinessService', () => {
  let service: LearningModulesBusinessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LearningModulesBusinessService],
    }).compile();

    service = module.get<LearningModulesBusinessService>(
      LearningModulesBusinessService,
    );
  });

  describe('calculateProgress', () => {
    it('should return zero progress for empty modules array', () => {
      const result = service.calculateProgress([]);

      expect(result).toEqual({
        totalModules: 0,
        completedModules: 0,
        completionPercentage: 0,
      });
    });

    it('should return correct progress when no modules are completed', () => {
      const modules: LearningModule[] = [
        { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: false },
        { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: false },
      ];

      const result = service.calculateProgress(modules);

      expect(result).toEqual({
        totalModules: 2,
        completedModules: 0,
        completionPercentage: 0,
      });
    });

    it('should return correct progress when all modules are completed', () => {
      const modules: LearningModule[] = [
        { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: true },
        { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: true },
        { id: '3', title: 'Module 3', category: 'AI', estimatedMinutes: 60, completed: true },
      ];

      const result = service.calculateProgress(modules);

      expect(result).toEqual({
        totalModules: 3,
        completedModules: 3,
        completionPercentage: 100,
      });
    });

    it('should return correct progress when some modules are completed', () => {
      const modules: LearningModule[] = [
        { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: true },
        { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: false },
        { id: '3', title: 'Module 3', category: 'AI', estimatedMinutes: 60, completed: true },
        { id: '4', title: 'Module 4', category: 'AI', estimatedMinutes: 20, completed: false },
      ];

      const result = service.calculateProgress(modules);

      expect(result).toEqual({
        totalModules: 4,
        completedModules: 2,
        completionPercentage: 50,
      });
    });

    it('should return correct progress with rounded percentage', () => {
      const modules: LearningModule[] = [
        { id: '1', title: 'Module 1', category: 'AI', estimatedMinutes: 30, completed: true },
        { id: '2', title: 'Module 2', category: 'AI', estimatedMinutes: 45, completed: false },
        { id: '3', title: 'Module 3', category: 'AI', estimatedMinutes: 60, completed: false },
      ];

      const result = service.calculateProgress(modules);

      expect(result).toEqual({
        totalModules: 3,
        completedModules: 1,
        completionPercentage: 33,
      });
    });
  });

  describe('validateCompletionStatus', () => {
    it('should return true for boolean true', () => {
      expect(service.validateCompletionStatus(true)).toBe(true);
    });

    it('should return true for boolean false', () => {
      expect(service.validateCompletionStatus(false)).toBe(true);
    });

    it('should return false for non-boolean values', () => {
      expect(service.validateCompletionStatus('true' as any)).toBe(false);
      expect(service.validateCompletionStatus(1 as any)).toBe(false);
      expect(service.validateCompletionStatus(null as any)).toBe(false);
      expect(service.validateCompletionStatus(undefined as any)).toBe(false);
    });
  });
});

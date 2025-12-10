import { calculateCompletionPercentage } from './calculate-completion-percentage.util';

describe('calculateCompletionPercentage', () => {
  it('should return 0 when total count is 0', () => {
    const result = calculateCompletionPercentage(0, 0);
    expect(result).toBe(0);
  });

  it('should return 0 when completed count is 0', () => {
    const result = calculateCompletionPercentage(0, 10);
    expect(result).toBe(0);
  });

  it('should return 100 when all modules are completed', () => {
    const result = calculateCompletionPercentage(10, 10);
    expect(result).toBe(100);
  });

  it('should return 50 when half of modules are completed', () => {
    const result = calculateCompletionPercentage(5, 10);
    expect(result).toBe(50);
  });

  it('should return rounded percentage for non-even division', () => {
    const result = calculateCompletionPercentage(1, 3);
    expect(result).toBe(33);
  });

  it('should return rounded percentage for 2 out of 3', () => {
    const result = calculateCompletionPercentage(2, 3);
    expect(result).toBe(67);
  });

  it('should handle single completed module correctly', () => {
    const result = calculateCompletionPercentage(1, 1);
    expect(result).toBe(100);
  });

  it('should handle large numbers correctly', () => {
    const result = calculateCompletionPercentage(789, 1000);
    expect(result).toBe(79);
  });
});

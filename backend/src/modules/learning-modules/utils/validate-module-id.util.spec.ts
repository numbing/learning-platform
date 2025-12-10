import { validateModuleId } from './validate-module-id.util';

describe('validateModuleId', () => {
  it('should return true for valid 24-character hex ObjectId', () => {
    const validId = '507f1f77bcf86cd799439011';
    expect(validateModuleId(validId)).toBe(true);
  });

  it('should return true for valid ObjectId with uppercase letters', () => {
    const validId = '507F1F77BCF86CD799439011';
    expect(validateModuleId(validId)).toBe(true);
  });

  it('should return true for valid ObjectId with mixed case', () => {
    const validId = '507f1F77BcF86cD799439011';
    expect(validateModuleId(validId)).toBe(true);
  });

  it('should return false for id that is too short', () => {
    const invalidId = '507f1f77bcf86cd79943901';
    expect(validateModuleId(invalidId)).toBe(false);
  });

  it('should return false for id that is too long', () => {
    const invalidId = '507f1f77bcf86cd7994390111';
    expect(validateModuleId(invalidId)).toBe(false);
  });

  it('should return false for id with invalid characters', () => {
    const invalidId = '507f1f77bcf86cd79943901g';
    expect(validateModuleId(invalidId)).toBe(false);
  });

  it('should return false for empty string', () => {
    expect(validateModuleId('')).toBe(false);
  });

  it('should return false for id with spaces', () => {
    const invalidId = '507f1f77 bcf86cd799439011';
    expect(validateModuleId(invalidId)).toBe(false);
  });

  it('should return false for id with special characters', () => {
    const invalidId = '507f1f77-bcf86cd799439011';
    expect(validateModuleId(invalidId)).toBe(false);
  });
});

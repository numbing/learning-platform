import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../../common/exceptions/base.exception';

export class InvalidCategoryException extends BaseException {
  constructor(category: string) {
    super(
      `Invalid category '${category}'. Must be one of: AI, Sustainability, Digital Skills`,
      HttpStatus.BAD_REQUEST,
    );
  }
}

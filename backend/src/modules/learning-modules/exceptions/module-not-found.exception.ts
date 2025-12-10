import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../../common/exceptions/base.exception';

export class ModuleNotFoundException extends BaseException {
  constructor(moduleId: string) {
    super(`Learning module with ID '${moduleId}' was not found`, HttpStatus.NOT_FOUND);
  }
}

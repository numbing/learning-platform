import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Network error: ${error.error.message}`;
    }

    return this.getServerErrorMessage(error);
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return 'Resource not found';
    }

    if (error.status === 400) {
      return error.error?.message || 'Invalid request';
    }

    if (error.status >= 500) {
      return 'Server error occurred. Please try again later.';
    }

    return 'An unexpected error occurred';
  }
}

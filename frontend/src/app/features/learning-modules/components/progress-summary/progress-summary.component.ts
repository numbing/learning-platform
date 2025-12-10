import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuleProgress } from '../../models/module-progress.model';

@Component({
    selector: 'app-progress-summary',
    imports: [CommonModule],
    templateUrl: './progress-summary.component.html',
    styleUrls: ['./progress-summary.component.css']
})
export class ProgressSummaryComponent {
  @Input({ required: true }) progress!: ModuleProgress;

  getProgressBarClass(): string {
    const percentage = this.progress.completionPercentage;

    if (percentage === 100) {
      return 'bg-success';
    }

    if (percentage >= 50) {
      return 'bg-info';
    }

    return 'bg-warning';
  }
}

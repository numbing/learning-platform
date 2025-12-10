import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LearningModule } from '../../models/learning-module.model';
import { formatDuration } from '../../utils/format-duration.util';

@Component({
    selector: 'app-module-item',
    imports: [CommonModule],
    templateUrl: './module-item.component.html',
    styleUrls: ['./module-item.component.css']
})
export class ModuleItemComponent {
  @Input({ required: true }) module!: LearningModule;
  @Output() completionToggle = new EventEmitter<{ id: string; completed: boolean }>();

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.completionToggle.emit({
      id: this.module.id,
      completed: checkbox.checked,
    });
  }

  getFormattedDuration(): string {
    return formatDuration(this.module.estimatedMinutes);
  }

  getCategoryBadgeClass(): string {
    switch (this.module.category) {
      case 'AI':
        return 'bg-primary';
      case 'Sustainability':
        return 'bg-success';
      case 'Digital Skills':
        return 'bg-info';
      default:
        return 'bg-secondary';
    }
  }
}

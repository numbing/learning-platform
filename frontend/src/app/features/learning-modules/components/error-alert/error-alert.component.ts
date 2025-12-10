import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'app-error-alert',
    imports: [],
    templateUrl: './error-alert.component.html',
    styleUrls: ['./error-alert.component.css']
})
export class ErrorAlertComponent {
  @Input() message: string = 'An error occurred';
  @Output() dismiss = new EventEmitter<void>();

  onDismiss(): void {
    this.dismiss.emit();
  }
}

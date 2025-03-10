import { Component, input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-label',
  imports: [ MatProgressBarModule ],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  readonly title = input.required<string>();
  readonly value = input<string | number>();
  readonly suffix = input<string>();
}

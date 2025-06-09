import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {LineBreaksPipe} from '../../line-breaks-pipe';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-service-modal',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    LineBreaksPipe,
    TranslocoPipe,
  ],
  templateUrl: './service-modal.component.html',
  styleUrl: './service-modal.component.scss'
})
export class ServiceModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA)
              public data: { title: string; description: string }) {}

}

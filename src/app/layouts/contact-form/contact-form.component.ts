import {Component, inject} from '@angular/core';
import {ContactFormService} from '../../core/services/contact-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslocoPipe} from '@jsverse/transloco';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    TranslocoPipe,
    NgIf
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',

})
export class ContactFormComponent {
  private readonly dialogStore = inject(ContactFormService);
  readonly form = this.dialogStore.contactForm;
  readonly dialogLoading = this.dialogStore.loading;
  readonly dialogError = this.dialogStore.formInvalid;

  saveDictionary(): void {
    console.log(this.form.value);
    this.dialogStore.save();
  }

}

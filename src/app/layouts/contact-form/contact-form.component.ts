import {Component, inject, OnInit, PLATFORM_ID} from '@angular/core';
import {ContactFormService} from '../../core/services/contact-form.service';
import {ReactiveFormsModule} from '@angular/forms';
import {isPlatformBrowser, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',

})
export class ContactFormComponent {
  private readonly dialogStore = inject(ContactFormService);
  readonly form = this.dialogStore.contactForm;
  readonly dialogLoading = this.dialogStore.loading;
  readonly dialogError = this.dialogStore.error;

  saveDictionary(): void {
    console.log(this.form.value);
    this.dialogStore.save();
  }

}

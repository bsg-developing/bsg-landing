import {inject, Injectable, signal} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  loading = signal(false);
  error = signal<string | null>(null);
  private readonly fb = inject(FormBuilder);
  private readonly http = inject(HttpClient);
  private apiUrl = 'https://api.solterprise.com/api/customer-requests';

  contactForm = this.fb.group({
    customer: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      companyName: ['', Validators.required]
    }),
    message: ['', Validators.required]
  });

 save() {
    this.contactForm.markAllAsTouched();
       if (this.contactForm.invalid) return;
        const value = this.contactForm.getRawValue() as CustomerRequest;
        this.loading.set(true);

        const request$ =   this.createRequest(value);

        request$.subscribe({
          next: () => {
            this.loading.set(false);
          },
          error: (error) => {
            this.loading.set(false);
            this.error.set(error.error?.message || error.error?.errors?.GENERAL?.[0] || 'Ошибка при отправке заявки');
          }
        });
  }



  createRequest(data: CustomerRequest): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}


export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
}

export interface CustomerRequest {
  customer: Customer;
  message: string;
}


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

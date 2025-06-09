import { Component } from '@angular/core';
import {TitleComponent} from '../../layouts/title/title.component';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'trusted-companies',
  imports: [
    TitleComponent,
    TranslocoPipe
  ],
  templateUrl: './trusted-companies.component.html',
  styleUrl: './trusted-companies.component.scss'
})
export class TrustedCompaniesComponent {

}

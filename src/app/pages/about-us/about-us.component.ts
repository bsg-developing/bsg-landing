import { Component } from '@angular/core';
import {SPECIALIZATIONS} from '../../core/constants/specialization.constant';

@Component({
  selector: 'app-about-us',
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {
  public educationList = SPECIALIZATIONS;
}

import {Component} from '@angular/core';
import {AboutUsComponent} from '../about-us/about-us.component';
import {TitleComponent} from '../../layouts/title/title.component';
import {SERVICES} from '../../core/constants/services';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-activity',
  imports: [
    AboutUsComponent,
    TitleComponent,
    NgForOf
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  services = SERVICES;
}

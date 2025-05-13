import { Component } from '@angular/core';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {NgxScrollTopComponent} from 'ngx-scrolltop';
import {CookiesManageComponent} from './layouts/cookies-manage/cookies-manage.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NgxScrollTopComponent, CookiesManageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

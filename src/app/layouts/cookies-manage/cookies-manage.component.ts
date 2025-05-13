import {Component, inject, OnInit} from '@angular/core';
import {SsrCookieService} from 'ngx-cookie-service-ssr';


@Component({
  selector: 'app-cookies-manage',
  imports: [],
  templateUrl: './cookies-manage.component.html',
  styleUrl: './cookies-manage.component.scss'
})
export class CookiesManageComponent  implements OnInit{
 public isCookieAccepted: boolean = false;
 private cookieService = inject(SsrCookieService);
 public isCheckingCookie: boolean = true;

 constructor() {}

  ngOnInit() {
    this.isCookieAccepted = this.cookieService.get('cookieAccepted') === 'true';
    this.isCheckingCookie = false;
  }

  acceptCookies() {
    this.cookieService.set('cookieAccepted', 'true', 365, '/');
    this.isCookieAccepted = true;
  }

}

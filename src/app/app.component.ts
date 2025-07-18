import {Component, inject} from '@angular/core';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {RouterOutlet} from '@angular/router';
import {NgxScrollTopComponent} from 'ngx-scrolltop';
import {ViewportScroller} from '@angular/common';
import {SeoService} from './core/services/seo.service';


@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterOutlet,
    NgxScrollTopComponent,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private vs = inject(ViewportScroller);
  private seoService = inject(SeoService);

  constructor() {
    this.seoService.initializeMetaTags();
    this.vs.setOffset([0, 100]);
  }
}

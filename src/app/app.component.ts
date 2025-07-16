import {Component, inject} from '@angular/core';
import {HeaderComponent} from './layouts/header/header.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {NgxScrollTopComponent} from 'ngx-scrolltop';
import {ViewportScroller} from '@angular/common';
import { TranslocoService } from '@jsverse/transloco';
import {distinctUntilChanged, filter, map} from 'rxjs';
import {Meta, Title } from '@angular/platform-browser';


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



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private translocoService: TranslocoService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.firstChild?.snapshot.paramMap.get('lang')),
        distinctUntilChanged()
      )
      .subscribe(lang => {
        if (lang && ['ru', 'en', 'ro'].includes(lang)) {
          this.translocoService.setActiveLang(lang);
          const meta = META_INFO[lang];
          if (meta) {
            this.titleService.setTitle(meta.title);
            this.metaService.updateTag({ name: 'description', content: meta.description });
          }
        }

      });
    this.vs.setOffset([0, 100]);
  }

}
const META_INFO: Record<string, { title: string; description: string }> = {
  ru: {
    title: 'Solterprise | Мы создаём цифровой бизнес',
    description: 'Solterprise — команда, которой доверяют. Создание сайтов, SEO, поддержка. Работаем по Молдове и за её пределами. ☎ +373 79 294 106."'
  },
  en: {
    title: 'Solterprise | We Build Digital Business',
    description: 'Solterprise — a team you can trust. Website development, SEO, support. We work across Moldova and beyond. ☎ +373 79 294 106.'
  },
  ro: {
    title: 'Solterprise | Construim afaceri digitale',
    description: 'Solterprise — o echipă de încredere. Creare site-uri, SEO, suport. Activăm în toată Moldova și în afara ei. ☎ +373 79 294 106.'
  }
};

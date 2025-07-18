import {inject, Injectable } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {TranslocoService} from '@jsverse/transloco';
import {Meta, Title} from '@angular/platform-browser';
import {distinctUntilChanged, filter, map} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {META_INFO} from '../constants/meta.constant';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslocoService);
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);

  public initializeMetaTags() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.firstChild?.snapshot.paramMap.get('lang')),
        distinctUntilChanged()
      )
      .subscribe(lang => {
        const currentLang = (lang && ['ru', 'en', 'ro'].includes(lang)) ? lang : 'en';
        this.translateService.setActiveLang(currentLang);

        const meta = META_INFO[currentLang];
        if (meta) {
          this.updateMetaTags(currentLang, meta.title, meta.description, meta.keywords);
        }
      });
  }

  private updateMetaTags(lang: string, title: string, description: string, keywords: string) {
    this.titleService.setTitle(title);

    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });

    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    if (this.document?.documentElement) {
      this.document.documentElement.lang = lang;
    }
  }

  public setNoIndexNoFollow(): void {
    this.metaService.removeTag("name='robots'");

    this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}

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
      )
      .subscribe((event: NavigationEnd) => {
        const lang = this.route.firstChild?.snapshot.paramMap.get('lang');
        const currentLang = (lang && ['ru', 'en', 'ro'].includes(lang)) ? lang : 'en';
        this.translateService.setActiveLang(currentLang);

        // Service pages set their own meta via ServiceDetailComponent
        if (event.urlAfterRedirects.includes('/services/')) return;

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

    const canonicalUrl = `https://solterprise.com/${lang}`;

    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });

    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    this.updateCanonicalUrl(canonicalUrl);
    this.updateHreflangLinks();

    if (this.document?.documentElement) {
      this.document.documentElement.lang = lang;
    }
  }

  private updateHreflangLinks(): void {
    if (!this.document) return;
    const languages = ['en', 'ru', 'ro'];
    this.document.querySelectorAll('link[hreflang]').forEach((el: Element) => el.remove());
    for (const l of languages) {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = `https://solterprise.com/${l}`;
      this.document.head.appendChild(link);
    }
  }

  private updateCanonicalUrl(url: string): void {
    if (!this.document) return;
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (link) {
      link.href = url;
    }
  }

  public setServiceMeta(lang: string, service: any): void {
    const currentLang = (['ru', 'en', 'ro'].includes(lang)) ? lang : 'en';

    const title = currentLang === 'ro'
      ? (service.titleRo ?? service.title)
      : currentLang === 'ru'
        ? service.title
        : (service.titleEng ?? service.title);

    const description = currentLang === 'ro'
      ? (service.descriptionRo ?? service.description)
      : currentLang === 'ru'
        ? service.description
        : (service.descriptionEng ?? service.description);

    const pageTitle = `${title} | Solterprise`;
    const canonicalUrl = `https://solterprise.com/${currentLang}/services/${service.slug}`;

    const locationKeywords: Record<string, string> = {
      ru: 'Молдова, Кишинёв',
      en: 'Moldova, Chisinau',
      ro: 'Moldova, Chișinău'
    };
    const keywords = `${title}, Solterprise, ${locationKeywords[currentLang]}`;

    this.titleService.setTitle(pageTitle);
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });

    this.metaService.updateTag({ property: 'og:title', content: pageTitle });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: canonicalUrl });

    this.metaService.updateTag({ name: 'twitter:title', content: pageTitle });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    this.updateCanonicalUrl(canonicalUrl);
    this.updateServiceHreflangLinks(service.slug);

    if (this.document?.documentElement) {
      this.document.documentElement.lang = currentLang;
    }
  }

  private updateServiceHreflangLinks(slug: string): void {
    if (!this.document) return;
    const languages = ['en', 'ru', 'ro'];
    this.document.querySelectorAll('link[hreflang]').forEach((el: Element) => el.remove());
    for (const l of languages) {
      const link = this.document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = l;
      link.href = `https://solterprise.com/${l}/services/${slug}`;
      this.document.head.appendChild(link);
    }
  }

  public setNoIndexNoFollow(): void {
    this.metaService.removeTag("name='robots'");

    this.metaService.addTag({ name: 'robots', content: 'noindex, nofollow' });
  }
}

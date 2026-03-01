import {Component, inject, OnInit, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SERVICES} from '../../core/constants/services';
import {TranslocoService} from '@jsverse/transloco';
import {toSignal} from '@angular/core/rxjs-interop';
import {SeoService} from '../../core/services/seo.service';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {ContactFormComponent} from '../../layouts/contact-form/contact-form.component';
import {MenuComponent} from '../../layouts/menu/menu.component';

@Component({
  standalone: true,
  selector: 'app-service-detail',
  imports: [RouterLink, ContactFormComponent, MenuComponent],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.scss'
})
export class ServiceDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private transloco = inject(TranslocoService);
  private seoService = inject(SeoService);
  private document = inject(DOCUMENT);

  readonly currentLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang()
  });

  service: any = null;
  private jsonLdElement: HTMLScriptElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    const lang = this.route.snapshot.paramMap.get('lang');

    if (lang && ['ru', 'en', 'ro'].includes(lang)) {
      this.transloco.setActiveLang(lang);
    }

    this.service = SERVICES.find(s => s.slug === slug);

    if (!this.service) {
      this.router.navigate([lang || 'ru'], {replaceUrl: true});
      return;
    }

    this.seoService.setServiceMeta(lang || 'ru', this.service);
    this.addJsonLd(lang || 'ru');
  }

  ngOnDestroy(): void {
    if (this.jsonLdElement) {
      this.jsonLdElement.remove();
    }
  }

  get title(): string {
    const lang = this.currentLang();
    if (lang === 'ro') return this.service?.titleRo ?? this.service?.title;
    if (lang === 'ru') return this.service?.title ?? '';
    return this.service?.titleEng ?? this.service?.title;
  }

  get description(): string {
    const lang = this.currentLang();
    if (lang === 'ro') return this.service?.descriptionFullRo ?? this.service?.descriptionFull;
    if (lang === 'ru') return this.service?.descriptionFull ?? '';
    return this.service?.descriptionFullEng ?? this.service?.descriptionFull;
  }

  get shortDescription(): string {
    const lang = this.currentLang();
    if (lang === 'ro') return this.service?.descriptionRo ?? this.service?.description;
    if (lang === 'ru') return this.service?.description ?? '';
    return this.service?.descriptionEng ?? this.service?.description;
  }

  get homePath(): string {
    return `/${this.currentLang()}`;
  }

  private addJsonLd(lang: string): void {
    if (!this.service || !this.document) return;

    const title = lang === 'ro'
      ? this.service.titleRo ?? this.service.title
      : lang === 'ru'
        ? this.service.title
        : this.service.titleEng ?? this.service.title;

    const desc = lang === 'ro'
      ? this.service.descriptionRo ?? this.service.description
      : lang === 'ru'
        ? this.service.description
        : this.service.descriptionEng ?? this.service.description;

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: title,
      description: desc,
      url: `https://solterprise.com/${lang}/services/${this.service.slug}`,
      provider: {
        '@type': 'Organization',
        name: 'Solterprise',
        url: 'https://solterprise.com'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Moldova'
      }
    };

    this.jsonLdElement = this.document.createElement('script');
    this.jsonLdElement.type = 'application/ld+json';
    this.jsonLdElement.textContent = JSON.stringify(jsonLd);
    this.document.head.appendChild(this.jsonLdElement);
  }
}

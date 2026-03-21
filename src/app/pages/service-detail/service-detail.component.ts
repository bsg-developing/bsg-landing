import {Component, inject, OnInit, OnDestroy, PLATFORM_ID, Inject} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {SERVICES} from '../../core/constants/services';
import {TranslocoService} from '@jsverse/transloco';
import {toSignal} from '@angular/core/rxjs-interop';
import {SeoService} from '../../core/services/seo.service';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {ContactFormComponent} from '../../layouts/contact-form/contact-form.component';
import {MenuComponent} from '../../layouts/menu/menu.component';

const RELATED_SERVICES: Record<string, string[]> = {
  'analytics-and-audit': ['seo-optimization', 'website-development', 'ai-solutions'],
  '1c-automation': ['integrations-and-automation', 'ai-solutions', 'devops-and-infrastructure'],
  'website-development': ['web-design', 'seo-optimization', 'mobile-development'],
  'web-design': ['website-development', 'mobile-development', 'smm-promotion'],
  'mobile-development': ['website-development', 'telegram-mini-app', 'web-design'],
  'smm-promotion': ['seo-optimization', 'web-design', 'website-development'],
  'seo-optimization': ['analytics-and-audit', 'website-development', 'smm-promotion'],
  'telegram-mini-app': ['mobile-development', 'ai-solutions', 'website-development'],
  'ai-solutions': ['1c-automation', 'integrations-and-automation', 'analytics-and-audit'],
  'integrations-and-automation': ['1c-automation', 'ai-solutions', 'devops-and-infrastructure'],
  'devops-and-infrastructure': ['integrations-and-automation', 'website-development', 'ai-solutions'],
};

const PRICING_MAP: Record<string, { price: string; currency: string }> = {
  'website-development': { price: '800', currency: 'EUR' },
  '1c-automation': { price: '700', currency: 'EUR' },
  'ai-solutions': { price: '2000', currency: 'EUR' },
  'mobile-development': { price: '2500', currency: 'EUR' },
};

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

  get faqItems(): Array<{q: string, a: string}> {
    const lang = this.currentLang();
    return this.service?.faq?.[lang] || [];
  }

  get relatedServices(): Array<{slug: string, title: string}> {
    const lang = this.currentLang();
    const slugs = RELATED_SERVICES[this.service?.slug] || [];
    return slugs.map(slug => {
      const s = SERVICES.find(srv => srv.slug === slug);
      if (!s) return null;
      const title = lang === 'ro' ? (s.titleRo ?? s.title) : lang === 'en' ? (s.titleEng ?? s.title) : s.title;
      return { slug, title };
    }).filter(Boolean) as Array<{slug: string, title: string}>;
  }

  get relatedTitle(): string {
    const lang = this.currentLang();
    const titles: Record<string, string> = {
      en: 'Related Services',
      ru: 'Связанные услуги',
      ro: 'Servicii conexe'
    };
    return titles[lang] || titles['en'];
  }

  get faqTitle(): string {
    const lang = this.currentLang();
    const titles: Record<string, string> = {
      en: 'Frequently Asked Questions',
      ru: 'Часто задаваемые вопросы',
      ro: 'Întrebări frecvente'
    };
    return titles[lang] || titles['en'];
  }

  private getTitle(lang: string): string {
    return lang === 'ro'
      ? this.service.titleRo ?? this.service.title
      : lang === 'ru'
        ? this.service.title
        : this.service.titleEng ?? this.service.title;
  }

  private getDescription(lang: string): string {
    return lang === 'ro'
      ? this.service.descriptionRo ?? this.service.description
      : lang === 'ru'
        ? this.service.description
        : this.service.descriptionEng ?? this.service.description;
  }

  private addJsonLd(lang: string): void {
    if (!this.service || !this.document) return;

    const title = this.getTitle(lang);
    const desc = this.getDescription(lang);

    const homeLabel: Record<string, string> = { en: 'Home', ru: 'Главная', ro: 'Acasă' };
    const servicesLabel: Record<string, string> = { en: 'Services', ru: 'Услуги', ro: 'Servicii' };

    const graph: any[] = [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: homeLabel[lang] || 'Home',
            item: `https://solterprise.com/${lang}`
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: servicesLabel[lang] || 'Services',
            item: `https://solterprise.com/${lang}#Approach`
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: title
          }
        ]
      }
    ];

    const serviceSchema: any = {
      '@type': 'Service',
      '@id': `https://solterprise.com/${lang}/services/${this.service.slug}#service`,
      name: title,
      description: desc,
      url: `https://solterprise.com/${lang}/services/${this.service.slug}`,
      provider: {
        '@id': 'https://solterprise.com/#organization'
      },
      areaServed: {
        '@type': 'Country',
        name: 'Moldova'
      }
    };

    const pricing = PRICING_MAP[this.service.slug];
    if (pricing) {
      serviceSchema.hasOfferCatalog = {
        '@type': 'OfferCatalog',
        name: title,
        itemListElement: [{
          '@type': 'Offer',
          price: pricing.price,
          priceCurrency: pricing.currency,
          url: `https://solterprise.com/${lang}/services/${this.service.slug}`,
          seller: { '@id': 'https://solterprise.com/#organization' }
        }]
      };
    }

    graph.push(serviceSchema);

    const faqData = this.service.faq?.[lang];
    if (faqData && faqData.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqData.map((item: any) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a
          }
        }))
      });
    }

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': graph
    };

    this.jsonLdElement = this.document.createElement('script');
    this.jsonLdElement.type = 'application/ld+json';
    this.jsonLdElement.textContent = JSON.stringify(jsonLd);
    this.document.head.appendChild(this.jsonLdElement);
  }
}

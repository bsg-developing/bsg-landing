import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-pricing-block',
  standalone: true,
  imports: [TranslocoPipe, RouterLink],
  templateUrl: './pricing-block.component.html',
  styleUrl: './pricing-block.component.scss'
})
export class PricingBlockComponent implements AfterViewInit, OnInit, OnDestroy {
  pricingItems = [
    {key: 'landing', icon: 'fa-solid fa-file', marketPrice: '800', ourPrice: '350', factor: '2', serviceSlug: 'website-development'},
    {key: 'corporate', icon: 'fa-solid fa-building', marketPrice: '2,000', ourPrice: '800', factor: '2.5', serviceSlug: 'website-development'},
    {key: 'ecommerce', icon: 'fa-solid fa-cart-shopping', marketPrice: '5,000', ourPrice: '1,500', factor: '3', serviceSlug: 'website-development'},
    {key: 'onec', icon: 'fa-solid fa-database', marketPrice: '2,000', ourPrice: '700', factor: '3', serviceSlug: '1c-automation'},
    {key: 'ai', icon: 'fa-solid fa-brain', marketPrice: '10,000', ourPrice: '2,000', factor: '5', serviceSlug: 'ai-solutions'},
    {key: 'mobile', icon: 'fa-solid fa-mobile-screen-button', marketPrice: '7,500', ourPrice: '2,500', factor: '3', serviceSlug: 'mobile-development'}
  ];

  private jsonLdElement: HTMLScriptElement | null = null;

  constructor(
    private elRef: ElementRef,
    private transloco: TranslocoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.addOffersJsonLd();
  }

  ngOnDestroy(): void {
    if (this.jsonLdElement) {
      this.jsonLdElement.remove();
    }
  }

  getServiceLink(item: any): string {
    const lang = this.transloco.getActiveLang() || 'ru';
    return `/${lang}/services/${item.serviceSlug}`;
  }

  private addOffersJsonLd(): void {
    const offers = this.pricingItems.map(item => ({
      '@type': 'Offer',
      name: this.transloco.translate(`pricing.items.${item.key}.name`),
      description: this.transloco.translate(`pricing.items.${item.key}.desc`),
      price: item.ourPrice.replace(',', ''),
      priceCurrency: 'EUR',
      url: `https://solterprise.com/${this.transloco.getActiveLang() || 'ru'}/services/${item.serviceSlug}`,
      seller: {
        '@type': 'Organization',
        name: 'Solterprise'
      }
    }));

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: this.transloco.translate('pricing.title'),
      itemListElement: offers.map((offer, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: offer
      }))
    };

    this.jsonLdElement = this.document.createElement('script');
    this.jsonLdElement.type = 'application/ld+json';
    this.jsonLdElement.textContent = JSON.stringify(jsonLd);
    this.document.head.appendChild(this.jsonLdElement);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof IntersectionObserver === 'undefined') return;
    const items = this.elRef.nativeElement.querySelectorAll('.pricing-card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.1}
    );
    items.forEach((item: Element) => observer.observe(item));
  }
}

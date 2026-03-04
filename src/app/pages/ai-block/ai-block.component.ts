import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-ai-block',
  standalone: true,
  imports: [TranslocoPipe, RouterLink],
  templateUrl: './ai-block.component.html',
  styleUrl: './ai-block.component.scss'
})
export class AiBlockComponent implements AfterViewInit, OnInit, OnDestroy {
  painPoints = [
    {key: 'cards', icon: 'fa-solid fa-clock'},
    {key: 'analytics', icon: 'fa-solid fa-chart-line'},
    {key: 'sync', icon: 'fa-solid fa-arrows-rotate'},
    {key: 'decisions', icon: 'fa-solid fa-dice'},
    {key: 'onec', icon: 'fa-solid fa-database'}
  ];

  private jsonLdElement: HTMLScriptElement | null = null;

  constructor(
    private elRef: ElementRef,
    private router: Router,
    private transloco: TranslocoService,
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.addFaqJsonLd();
  }

  ngOnDestroy(): void {
    if (this.jsonLdElement) {
      this.jsonLdElement.remove();
    }
  }

  get aiServiceLink(): string {
    const lang = this.transloco.getActiveLang() || 'ru';
    return `/${lang}/services/ai-solutions`;
  }

  private addFaqJsonLd(): void {
    const lang = this.transloco.getActiveLang() || 'ru';
    const faqItems = this.painPoints.map(point => ({
      '@type': 'Question',
      name: this.transloco.translate(`ai.points.${point.key}.pain`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: this.transloco.translate(`ai.points.${point.key}.solution`)
          .replace(/<[^>]*>/g, '')
      }
    }));

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems
    };

    this.jsonLdElement = this.document.createElement('script');
    this.jsonLdElement.type = 'application/ld+json';
    this.jsonLdElement.textContent = JSON.stringify(jsonLd);
    this.document.head.appendChild(this.jsonLdElement);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const items = this.elRef.nativeElement.querySelectorAll('.pain-card');
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

  scrollToContact(): void {
    const el = document.getElementById('contact-us');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  }
}

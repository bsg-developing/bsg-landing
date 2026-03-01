import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-pricing-block',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './pricing-block.component.html',
  styleUrl: './pricing-block.component.scss'
})
export class PricingBlockComponent implements AfterViewInit {
  pricingItems = [
    {key: 'landing', icon: 'fa-solid fa-file', marketPrice: '800', ourPrice: '350', factor: '2'},
    {key: 'corporate', icon: 'fa-solid fa-building', marketPrice: '2,000', ourPrice: '800', factor: '2.5'},
    {key: 'ecommerce', icon: 'fa-solid fa-cart-shopping', marketPrice: '5,000', ourPrice: '1,500', factor: '3'},
    {key: 'onec', icon: 'fa-solid fa-database', marketPrice: '2,000', ourPrice: '700', factor: '3'},
    {key: 'ai', icon: 'fa-solid fa-brain', marketPrice: '10,000', ourPrice: '2,000', factor: '5'},
    {key: 'mobile', icon: 'fa-solid fa-mobile-screen-button', marketPrice: '7,500', ourPrice: '2,500', factor: '3'}
  ];

  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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

import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ai-block',
  standalone: true,
  imports: [TranslocoPipe],
  templateUrl: './ai-block.component.html',
  styleUrl: './ai-block.component.scss'
})
export class AiBlockComponent implements AfterViewInit {
  painPoints = [
    {key: 'cards', icon: 'fa-solid fa-clock'},
    {key: 'analytics', icon: 'fa-solid fa-chart-line'},
    {key: 'sync', icon: 'fa-solid fa-arrows-rotate'},
    {key: 'decisions', icon: 'fa-solid fa-dice'},
    {key: 'onec', icon: 'fa-solid fa-database'}
  ];

  constructor(
    private elRef: ElementRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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

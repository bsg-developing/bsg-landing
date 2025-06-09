import {AfterViewInit, Component, Inject, Input, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'custom-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements AfterViewInit {
  @Input() text: string = 'Expertise in Data Science and Artificial Intelligence';
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    const separators = document.querySelectorAll('.separator-container');
    separators.forEach(el => observer.observe(el));
  }
}

import {AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID} from '@angular/core';
import {TitleComponent} from '../../layouts/title/title.component';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-project-timeline',
  imports: [
    TitleComponent,
  ],
  templateUrl: './project-timeline.component.html',
  styleUrl: './project-timeline.component.scss'
})
export class ProjectTimelineComponent implements AfterViewInit {
  constructor(
    private elRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const blocks = this.elRef.nativeElement.querySelectorAll('.block-text');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      {threshold: 0.3}
    );

    blocks.forEach((block: Element) => observer.observe(block));
  }
}

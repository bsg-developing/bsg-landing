import {AfterViewInit, Component, Inject, PLATFORM_ID} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {animate, style, transition, trigger} from '@angular/animations';
import {ActivityComponent} from '../activity/activity.component';
import {IdeComponent} from '../../layouts/ide/ide.component';
import {ProductsComponent} from '../products/products.component';
import {isPlatformBrowser} from '@angular/common';
import {StackComponent} from '../stack/stack.component';
import {ProjectTimelineComponent} from '../project-timeline/project-timeline.component';
import {BackgroundWrapperComponent} from '../../layouts/background-wrapper/background-wrapper.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    TranslocoPipe,
    ActivityComponent,
    IdeComponent,
    ProductsComponent,
    StackComponent,
    ProjectTimelineComponent,
    BackgroundWrapperComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100px)' }),
        animate('1s 0.2s', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('hoverEffect', [
      transition('void => *', [
        style({ backgroundColor: 'transparent', color: 'gray' }),
        animate('0.3s', style({ backgroundColor: 'lightgray', color: 'black' })),
      ]),
    ]),
    trigger('countUp', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(
          '{{ duration }}ms {{ easing }}',
          style({ opacity: 1 })
        ),
      ], {
        params: { duration: 2000, easing: 'ease-out' }
      })
    ]),
  ],
})
export class HomeComponent implements AfterViewInit {
  stats = [
    { end: 10, label: 'Years of exp' },
    { end: 30, label: 'Lorem ipsum dolor.' },
    { end: 5,  label: 'Lorem ipsum dolor.' },
    { end: 6,  label: 'Lorem ipsum dolor sit amet.' }
  ];
  values = this.stats.map(() => 0);
  duration = 2000;
  isBrowser: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  onCountStart(event: AnimationEvent, endVal: number, idx: number) {
    if (!this.isBrowser) {
      this.values[idx] = endVal;
      return;
    }

    const start = performance.now();
    const step = (now = performance.now()) => {
      const t = Math.min((now - start) / this.duration, 1);
      this.values[idx] = Math.floor(endVal * t);
      if (t < 1) {
        requestAnimationFrame(step);
      } else {
        this.values[idx] = endVal;
      }
    };

    requestAnimationFrame(step);
  }

  ngAfterViewInit(): void {
    if (!this.isBrowser) {
      return;
    }

    const purple = document.getElementById('auroraPurple');
    const cyan   = document.getElementById('auroraCyan');

    if (purple && cyan) {
      window.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        purple.style.transform = `translate(${x / 40}px, ${y / 40}px) rotate(5deg)`;
        cyan.style.transform   = `translate(${x / -60}px, ${y / -60}px) rotate(-3deg)`;
      });
    }
  }
}

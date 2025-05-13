import {Component} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {animate, style, transition, trigger} from '@angular/animations';
import {AboutUsComponent} from '../about-us/about-us.component';
import {ActivityComponent} from '../activity/activity.component';
import {IdeComponent} from '../../layouts/ide/ide.component';
import {ProductsComponent} from '../products/products.component';
import {NgForOf, NgStyle} from '@angular/common';
import {StackComponent} from '../stack/stack.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [
    TranslocoPipe,
    AboutUsComponent,
    ActivityComponent,
    IdeComponent,
    ProductsComponent,
    NgStyle,
    StackComponent,
    NgForOf,
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
export class HomeComponent {
  stats = [
    { end: 10, label: 'Years of exp' },
    { end: 30, label: 'Lorem ipsum dolor.' },
    { end: 5,  label: 'Lorem ipsum dolor.' },
    { end: 6,  label: 'Lorem ipsum dolor sit amet.' }
  ];
  values = this.stats.map(() => 0);
  duration = 2000;



  onCountStart(event: AnimationEvent, endVal: number, idx: number) {
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
}

import { Component } from '@angular/core';
import {TitleComponent} from "../title/title.component";
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'slider',
  imports: [
    TitleComponent,
    TranslocoPipe
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  logos: string[] = [
    '/assets/pngegg.png',
    '/assets/Open-AI-White-Logo-PNG.png',
    '/assets/images/stack/angular.png',
    '/assets/html.png',
    '/assets/css.png',
    '/assets/images/stack/java.png',
    '/assets/images/stack/spring.png',
    '/assets/Jira.png',
    '/assets/gitHub.png',
    '/assets/images/stack/Flutter.png',
    '/assets/images/stack/1C.png'
  ];
}

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
  logos = [
    { src: '/assets/pngegg.png', alt: 'PostgreSQL' },
    { src: '/assets/Open-AI-White-Logo-PNG.png', alt: 'OpenAI' },
    { src: '/assets/images/stack/angular.png', alt: 'Angular' },
    { src: '/assets/images/stack/java.png', alt: 'Java' },
    { src: '/assets/images/stack/spring.png', alt: 'Spring Boot' },
    { src: '/assets/Jira.png', alt: 'Jira' },
    { src: '/assets/gitHub.png', alt: 'GitHub' },
    { src: '/assets/images/stack/Flutter.png', alt: 'Flutter' },
    { src: '/assets/images/stack/1C.png', alt: '1C Enterprise' },
  ];
}

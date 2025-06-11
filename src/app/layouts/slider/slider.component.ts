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
    '/assets/angular_wordmark_white.png',
    '/assets/pngegg.png',
    '/assets/pngfind.com-java-logo-transparent-png-2225828.png',
    '/assets/Open-AI-White-Logo-PNG.png',
    '/assets/pngegg (1).png',
    '/assets/html.png',
    '/assets/css.png',
    '/assets/Jira.png',
    '/assets/gitHub.png',
    '/assets/Redis-Lab-logow.png',
    '/assets/Google-Gemini-White-Logo.png'
  ];
}

import { Component } from '@angular/core';
import {AboutUsComponent} from '../about-us/about-us.component';
import {TitleComponent} from '../../layouts/title/title.component';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-project-timeline',
  imports: [
    AboutUsComponent,
    TitleComponent,
    TranslocoPipe
  ],
  templateUrl: './project-timeline.component.html',
  styleUrl: './project-timeline.component.scss'
})
export class ProjectTimelineComponent {}

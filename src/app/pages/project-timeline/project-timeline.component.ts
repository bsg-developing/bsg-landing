import { Component } from '@angular/core';
import {TitleComponent} from '../../layouts/title/title.component';
import {TranslocoPipe} from '@jsverse/transloco';

@Component({
  selector: 'app-project-timeline',
  imports: [
    TitleComponent,
  ],
  templateUrl: './project-timeline.component.html',
  styleUrl: './project-timeline.component.scss'
})
export class ProjectTimelineComponent {}

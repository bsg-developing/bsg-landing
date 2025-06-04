import { Component } from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {AboutUsComponent} from "../about-us/about-us.component";
import {TitleComponent} from '../../layouts/title/title.component';

@Component({
  selector: 'app-stack',
  imports: [
    TranslocoPipe,
    AboutUsComponent,
    TitleComponent
  ],
  templateUrl: './stack.component.html',
  styleUrl: './stack.component.scss'
})
export class StackComponent {
  technologies = [
    {img: 'assets/angular.png', title: 'Angular'},
    {img: 'assets/61cc5844-docker.png', title: 'Docker'},
    {img: 'assets/java8001.png', title: 'Java'},
    {img: 'assets/logotip-1c.png', title: '1C'},
    {img: 'assets/ui-ux.png', title: 'UI-UX'},
    {img: 'assets/postgreSQL.png', title: 'PostgreSQL'},
    {img: 'assets/openai800.png', title: 'OpenAi'},
    {img: 'assets/gitlab800.png', title: 'GitLab'},
    {img: 'assets/ts800.png', title: 'TypeScript'}
  ];
}

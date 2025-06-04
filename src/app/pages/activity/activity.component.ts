import {Component} from '@angular/core';
import {AboutUsComponent} from '../about-us/about-us.component';
import {TitleComponent} from '../../layouts/title/title.component';

@Component({
  selector: 'app-activity',
  imports: [
    AboutUsComponent,
    TitleComponent
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  technologies = [
    {img: 'assets/angular.png', title: 'Разработка приложений'},
    {img: 'assets/61cc5844-docker.png', title: 'сайты'},
    {img: 'assets/java8001.png', title: ' ERP системы'},
    {img: 'assets/logotip-1c.png', title: '1C'},
    {img: 'assets/ui-ux.png', title: 'UI-UX'},
    {img: 'assets/postgreSQL.png', title: 'PostgreSQL'},
    {img: 'assets/openai800.png', title: 'OpenAi'},
    {img: 'assets/gitlab800.png', title: 'GitLab'},
    {img: 'assets/ts800.png', title: 'TypeScript'}
  ];
}

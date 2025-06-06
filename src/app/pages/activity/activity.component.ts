import {Component} from '@angular/core';
import {AboutUsComponent} from '../about-us/about-us.component';
import {TitleComponent} from '../../layouts/title/title.component';
import {SERVICES} from '../../core/constants/services';
import {NgForOf} from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ServiceModalComponent} from '../../layouts/service-modal/service-modal.component';


export interface Service {
  icon: string;
  title: string;
  description: string;
  descriptionRo?: string;
  descriptionEng?: string;
  descriptionFull?: string;
  descriptionFullRo?: string;
  descriptionFullEng?: string;
}

@Component({
  selector: 'app-activity',
  imports: [
    AboutUsComponent,
    TitleComponent,
    NgForOf
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  services = SERVICES;

  constructor(private dialog: MatDialog) {}

  openModal(service: Service) {
    this.dialog.open(ServiceModalComponent, {
      data: {
        title: service.title,
        description: service.descriptionFull
      },
      width: '400px',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    });
  }
}

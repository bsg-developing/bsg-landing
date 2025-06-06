import {Component, inject} from '@angular/core';
import {TitleComponent} from '../../layouts/title/title.component';
import {SERVICES} from '../../core/constants/services';
import {MatDialog} from '@angular/material/dialog';
import {ServiceModalComponent} from '../../layouts/service-modal/service-modal.component';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-activity',
  imports: [TitleComponent, TranslocoPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  services = SERVICES;
  private translocate = inject(TranslocoService);
  readonly currentLang = toSignal(this.translocate.langChanges$, {
    initialValue: this.translocate.getActiveLang()
  });
  private dialog = inject(MatDialog);

  getDescription(service: any): string {
    const lang = this.currentLang();
    if (lang === 'ro') return service.descriptionRo ?? service.description;
    if (lang === 'ru') return service.description ?? '';
    return service.descriptionEng ?? service.description;
  }

  getTitle(service: any): string {
    const lang = this.currentLang();
    if (lang === 'ro') return service.titleRo ?? service.title;
    if (lang === 'ru') return service.title ?? '';
    return service.titleEng ?? service.title;
  }

  openModal(service: { title: string; description: string }) {
    this.dialog.open(ServiceModalComponent, {
      data: {
        title: service.title,
        description: service.description
      },
      width: '400px',
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    });
  }
}

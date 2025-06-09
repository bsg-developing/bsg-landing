import {AfterViewInit, Component, Inject, inject, PLATFORM_ID} from '@angular/core';
import {TitleComponent} from '../../layouts/title/title.component';
import {SERVICES} from '../../core/constants/services';
import {MatDialog} from '@angular/material/dialog';
import {ServiceModalComponent} from '../../layouts/service-modal/service-modal.component';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {toSignal} from '@angular/core/rxjs-interop';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-activity',
  imports: [TitleComponent, TranslocoPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements AfterViewInit {
  services = SERVICES;
  private translocate = inject(TranslocoService);
  readonly currentLang = toSignal(this.translocate.langChanges$, {
    initialValue: this.translocate.getActiveLang()
  });
  private dialog = inject(MatDialog);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  openModal(service: any) {
    const lang = this.currentLang();

    const title = lang === 'ro'
      ? service.titleRo ?? service.title
      : lang === 'ru'
        ? service.title ?? ''
        : service.titleEng ?? service.title;

    const description = lang === 'ro'
      ? service.descriptionFullRo ?? service.descriptionFull
      : lang === 'ru'
        ? service.descriptionFull ?? ''
        : service.descriptionFullEng ?? service.descriptionFull;

    this.dialog.open(ServiceModalComponent, {
      data: { title, description },
      panelClass: 'custom-dialog-panel',
      backdropClass: 'custom-dialog-backdrop'
    });
  }

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach(card => observer.observe(card));
  }

}
export interface Service {
  icon: string;
  title: string;
  description: string;
  descriptionRo: string;
  descriptionEng: string;
  descriptionFull: string;
  descriptionFullRo: string;
  descriptionFullEng: string;
  titleEng: string;
  titleRo: string;
}

import {Component, inject} from '@angular/core';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {RouterLink} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {SERVICES} from '../../core/constants/services';

@Component({
  selector: 'app-footer',
  imports: [
    TranslocoPipe,
    RouterLink,
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private transloco = inject(TranslocoService);
  readonly currentLang = toSignal(this.transloco.langChanges$, {
    initialValue: this.transloco.getActiveLang()
  });

  footerServices = SERVICES;

  getServiceTitle(service: any): string {
    const lang = this.currentLang();
    if (lang === 'ro') return service.titleRo ?? service.title;
    if (lang === 'ru') return service.title ?? '';
    return service.titleEng ?? service.title;
  }
}

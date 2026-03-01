import {AfterViewInit, Component, Inject, inject, PLATFORM_ID} from '@angular/core';
import {TitleComponent} from '../../layouts/title/title.component';
import {SERVICES} from '../../core/constants/services';
import {Router} from '@angular/router';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {toSignal} from '@angular/core/rxjs-interop';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'activity',
  imports: [TitleComponent, TranslocoPipe],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent implements AfterViewInit {
  services = SERVICES;
  private translocate = inject(TranslocoService);
  private router = inject(Router);
  readonly currentLang = toSignal(this.translocate.langChanges$, {
    initialValue: this.translocate.getActiveLang()
  });
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

  openServicePage(service: any): void {
    this.router.navigate([this.currentLang(), 'services', service.slug]);
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

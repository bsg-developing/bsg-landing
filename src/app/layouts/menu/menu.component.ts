import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TranslocoService} from '@jsverse/transloco';
import {ClickOutsideDirective} from '../../core/directives/click-outside.directive';

@Component({
  selector: 'app-menu',
  imports: [ClickOutsideDirective],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public router = inject(Router);
  transloco = inject(TranslocoService)
  currentLang = this.transloco.getActiveLang();
  langMenuOpen = false;

  toggleLangMenu(): void {
    this.langMenuOpen = !this.langMenuOpen;
  }

  navigateToFragment(fragment: string) {
    if (!fragment) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    history.replaceState(null, '', this.router.url.split('#')[0]);
  }

  public changeLang(lang: string): void {
    this.langMenuOpen = false;
    this.transloco.setActiveLang(lang);
    localStorage.setItem('lang', lang);
    const segments = this.router.url.split('/');
    segments[1] = lang;
    this.router.navigate(segments);
  }


}

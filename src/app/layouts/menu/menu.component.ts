import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TranslocoService} from '@jsverse/transloco';
import {ClickOutsideDirective} from '../../core/directives/click-outside.directive';

@Component({
  selector: 'app-menu',
  imports: [
    ClickOutsideDirective
  ],
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

  changeLang(lang: string): void {
    this.langMenuOpen = false;
    this.transloco.setActiveLang(lang);
    this.currentLang = lang;
  }

}

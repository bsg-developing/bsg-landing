import {Component, inject} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {Language, LANGUAGES} from '../../core/configs/languages.config';
import {Router} from '@angular/router';
import {ClickOutsideDirective} from '../../core/directives/click-outside.directive';
import {MENU_ITEMS} from '../../core/constants/menu-items';

@Component({
  selector: 'app-header',
  imports: [
    UpperCasePipe,
    TranslocoPipe,
    ClickOutsideDirective,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public selectedLanguage: string = '';
  public  selectedIcon!: string ;
  public dropdownVisible = false;
  public languages = LANGUAGES;
  public router= inject(Router);
  private translocateService = inject(TranslocoService);
  public menuItems = MENU_ITEMS;

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const lang = localStorage.getItem('lang') || 'ro';
      this.selectedLanguage = lang;
      this.selectedIcon = LANGUAGES.find(lang => lang.code === this.selectedLanguage)?.flag || ' ';
      this.translocateService.setActiveLang(lang);
    }
  }

  public toggleLanguageDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public changeLang(lang: Language): void {
    this.translocateService.setActiveLang(lang.code);
    this.selectedLanguage = lang.code;
    this.selectedIcon = lang.flag;
    this.dropdownVisible = false;
    localStorage.setItem('lang', lang.code);
  }
  navigateToMain(): void {
    const element = document.getElementById('main');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.router.navigate([], {
        fragment: undefined,
        skipLocationChange: true,
        replaceUrl: true
      });
    }
  }


}

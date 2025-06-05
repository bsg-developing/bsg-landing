import {Component, inject} from '@angular/core';
import {NgClass, NgForOf, UpperCasePipe} from "@angular/common";
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {LANGUAGES} from '../../core/configs/languages.config';
import {Router, RouterLinkActive} from '@angular/router';
import {ClickOutsideDirective} from '../../core/directives/click-outside.directive';

@Component({
  selector: 'app-header',
  imports: [
    UpperCasePipe,
    TranslocoPipe,
    RouterLinkActive,
    NgClass,
    ClickOutsideDirective,

    NgForOf,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent{
  public selectedLanguage!: string;
  public dropdownVisible = false;
  public languages = LANGUAGES;
  public router= inject(Router);
  public menuItems = [
    { fragment: 'activity', labelKey: 'aboutUs' },
    { fragment: 'features', labelKey: 'careers' },
    { fragment: 'technologies', labelKey: 'technologies' },
    { fragment: 'projects', labelKey: 'products' },
    { fragment: 'footer', labelKey: 'contactUs' }
  ];


  public isScrolled = false;
  public mobileMenuVisible = false;


  constructor(
    private translocateService: TranslocoService,
  ) {

    if (typeof window !== 'undefined' && window.localStorage) {
      const lang = localStorage.getItem('lang') || 'ro';
      this.selectedLanguage = lang;
      this.translocateService.setActiveLang(lang);
    }
  }
  public getFlagByCode(code: string): string {
    return this.languages.find(lang => lang.code === code)?.flag || '';
  }
  public toggleLanguageDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public changeLang(lang: string): void {
    this.translocateService.setActiveLang(lang);
    this.selectedLanguage = lang;
    this.dropdownVisible = false;
    localStorage.setItem('lang', lang);
  }


  public toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}

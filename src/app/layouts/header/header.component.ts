import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgIf, UpperCasePipe} from "@angular/common";
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {LANGUAGES} from '../../core/configs/languages.config';
import {Router, RouterLinkActive} from '@angular/router';
import {Subscription} from 'rxjs';
import {ViewportRuler} from '@angular/cdk/overlay';
import {ClickOutsideDirective} from '../../core/directives/click-outside.directive';

@Component({
  selector: 'app-header',
  imports: [
    UpperCasePipe,
    TranslocoPipe,
    RouterLinkActive,
    NgClass,
    ClickOutsideDirective,
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

  private scrollSub!: Subscription;

  constructor(
    private translocateService: TranslocoService,
  ) {

    if (typeof window !== 'undefined' && window.localStorage) {
      const lang = localStorage.getItem('lang') || 'ro';
      this.selectedLanguage = lang;
      this.translocateService.setActiveLang(lang);
    }
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

import {Component, inject} from '@angular/core';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import {ThemeService} from '../../core/services/theme.service';
import {LANGUAGES} from '../../core/configs/languages.config';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    UpperCasePipe,
    TranslocoPipe,
    RouterLink,
    RouterLinkActive,
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public selectedLanguage!: string;
  public  logo = '</> Z & K';
  public dropdownVisible: boolean = false;
  public languages  = LANGUAGES;
  public isDarkTheme = false;
  public router = inject(Router);

  constructor(
    private translocateService: TranslocoService,
    private themeService: ThemeService) {
    if (typeof window !== 'undefined' && window.localStorage) {
      const lang = localStorage.getItem('lang') || 'ro';
      this.selectedLanguage = lang;
      this.translocateService.setActiveLang(lang);
    }
  }

  public toggleLanguageDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

 public changeLang(lang: string) {
    this.translocateService.setActiveLang(lang);
    this.selectedLanguage = lang;
    this.dropdownVisible = false;
    localStorage.setItem('lang', lang);
  }


  public toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme();
  }

  mobileMenuVisible = false;

  toggleMobileMenu() {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}

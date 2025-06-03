import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {ThemeService} from '../../core/services/theme.service';
import {LANGUAGES} from '../../core/configs/languages.config';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {Subscription} from 'rxjs';
import {ViewportRuler} from '@angular/cdk/overlay';

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
export class HeaderComponent implements OnInit, OnDestroy {
  public selectedLanguage!: string;
  public logo = '</> Z & K';
  public dropdownVisible = false;
  public languages = LANGUAGES;
  public isDarkTheme = false;
  public router: Router;

  public isScrolled = false;
  public mobileMenuVisible = false;

  private scrollSub!: Subscription;
  private viewportRuler: ViewportRuler;

  constructor(
    router: Router,
    private translocoService: TranslocoService,
    private themeService: ThemeService,
    viewportRuler: ViewportRuler
  ) {
    this.router = router;
    this.viewportRuler = viewportRuler;

    // Инициализация языка из localStorage (пример)
    if (typeof window !== 'undefined' && window.localStorage) {
      const lang = localStorage.getItem('lang') || 'ro';
      this.selectedLanguage = lang;
      this.translocoService.setActiveLang(lang);
    }
  }

  ngOnInit(): void {
    // Подписываемся на события прокрутки (CDK ViewportRuler)
    this.scrollSub = this.viewportRuler.change(0).subscribe(() => {
      const { top: scrollY } = this.viewportRuler.getViewportScrollPosition();
      this.isScrolled = scrollY > 0;
    });
  }

  ngOnDestroy(): void {
    this.scrollSub.unsubscribe();
  }

  public toggleLanguageDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }

  public changeLang(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.selectedLanguage = lang;
    this.dropdownVisible = false;
    localStorage.setItem('lang', lang);
  }

  public toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme();
  }

  public toggleMobileMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
}

import {Component, inject} from '@angular/core';
import {UpperCasePipe} from "@angular/common";
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {Language, LANGUAGES} from '../../core/configs/languages.config';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ClickOutsideDirective} from '../../core/directives/click-outside.directive';
import {MENU_ITEMS} from '../../core/constants/menu-items';
import {distinctUntilChanged, filter, map, take} from 'rxjs';

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
  private route = inject(ActivatedRoute);

  constructor() {
    this.getLang();
  }

  getLang(){
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.route.firstChild?.snapshot.paramMap.get('lang')),
        distinctUntilChanged()
      ).subscribe(lang => {
       this.selectedLanguage = (lang && ['ru', 'en', 'ro'].includes(lang)) ? lang : 'en';
      this.translocateService.setActiveLang(this.selectedLanguage );
    })
  }

  public toggleLanguageDropdown(): void {
    this.dropdownVisible = !this.dropdownVisible;
  }
  navigateToFragment(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    history.replaceState(null, '', this.router.url.split('#')[0]);
  }

  public changeLang(lang: Language): void {
    this.translocateService.setActiveLang(lang.code);
    this.selectedLanguage = lang.code;
    this.selectedIcon = lang.flag;
    this.dropdownVisible = false;
    localStorage.setItem('lang', lang.code);
    const segments = this.router.url.split('/');
    segments[1] = lang.code;
    this.router.navigate(segments);
  }


}

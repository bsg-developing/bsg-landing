import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withInMemoryScrolling, withRouterConfig} from '@angular/router';
import { provideTransloco } from '@jsverse/transloco';
import {provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {TranslocoHttpLoader} from './core/configs/transloco.config';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideTransloco({
      config: {
        availableLangs: ['en', 'ru', 'ro'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideClientHydration(withEventReplay()),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled'
      }),
      withRouterConfig({
        // чтобы при повторном клике на тот же URL + тот же фрагмент
        // он "reload" прокручивал заново
        onSameUrlNavigation: 'reload'
      })
    ),
  ]
};



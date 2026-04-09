import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideServerRouting } from '@angular/ssr';
import { TRANSLOCO_LOADER } from '@jsverse/transloco';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { TranslocoFsLoader } from './core/configs/transloco-server.loader';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideServerRouting(serverRoutes),
    { provide: TRANSLOCO_LOADER, useClass: TranslocoFsLoader },
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);

import { Injectable } from '@angular/core';
import type { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

@Injectable()
export class TranslocoFsLoader implements TranslocoLoader {
  getTranslation(lang: string): Observable<Translation> {
    try {
      // During SSR/prerender, read translation files from the filesystem
      // Try multiple possible paths (build vs dev)
      const paths = [
        join(process.cwd(), 'src', 'assets', 'i18n', `${lang}.json`),
        join(process.cwd(), 'dist', 'solterprise', 'browser', 'assets', 'i18n', `${lang}.json`),
        join(process.cwd(), 'public', 'assets', 'i18n', `${lang}.json`),
      ];

      for (const filePath of paths) {
        try {
          const content = readFileSync(filePath, 'utf-8');
          return of(JSON.parse(content));
        } catch {
          // Try next path
        }
      }

      console.error(`[TranslocoFsLoader] Translation file not found for lang: ${lang}`);
      return of({});
    } catch (err) {
      console.error(`[TranslocoFsLoader] Error loading translations for ${lang}:`, err);
      return of({});
    }
  }
}

import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GeoService {
  public countryCode: string | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Optional() @Inject('REQUEST') private request: any
  ) {
    if (isPlatformServer(this.platformId)) {
      const ip =
        this.request?.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
        this.request?.socket?.remoteAddress;

      if (ip && ip !== '::1' && !ip.startsWith('127.')) {
        // Серверный SSR-запрос к IP API
        fetch(`https://ipapi.co/${ip}/country/`)
          .then(res => res.text())
          .then(code => {
            this.countryCode = code.trim().toUpperCase();
            console.log('🌍 Country (via IP API):', this.countryCode);
          })
          .catch(() => {
            this.countryCode = null;
          });
      }
    }
  }

  getCountry(): string | null {
    console.log('getCountry()', this.countryCode);
    return this.countryCode;
  }
}

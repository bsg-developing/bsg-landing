import {Component, inject, Inject, Optional, PLATFORM_ID} from '@angular/core';
import {Router} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {SeoService} from '../../core/services/seo.service';
import {isPlatformServer} from '@angular/common';

@Component({
  selector: 'app-notfound',
  imports: [
    TranslocoPipe
  ],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.scss'
})
export class NotfoundComponent {
    private router = inject(Router);
   private seoService = inject(SeoService);

   constructor(
     @Inject(PLATFORM_ID) platformId: Object,
     @Optional() @Inject('RESPONSE') response: any
   ) {
    this.seoService.setNoIndexNoFollow();
    if (isPlatformServer(platformId) && response) {
      response.status(404);
    }
   }

    goHome(): void {
      this.router.navigate(['/']);
    }
}

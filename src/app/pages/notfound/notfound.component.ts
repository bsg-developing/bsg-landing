import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';
import {SeoService} from '../../core/services/seo.service';

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

   constructor() {
    this.seoService.setNoIndexNoFollow();
   }

    goHome(): void {
      this.router.navigate(['/']);
    }
}

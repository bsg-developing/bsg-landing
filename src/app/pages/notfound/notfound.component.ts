import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {TranslocoPipe} from '@jsverse/transloco';

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

    goHome(): void {
      this.router.navigate(['/']);
    }
}

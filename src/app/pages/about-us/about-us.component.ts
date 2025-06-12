import {AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, ViewChild} from '@angular/core';
import {TranslocoPipe, TranslocoService} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'about-us',
  imports: [TranslocoPipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent {}

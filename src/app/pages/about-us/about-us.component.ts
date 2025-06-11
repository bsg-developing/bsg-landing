import {AfterViewInit, Component, ElementRef, inject, OnDestroy, PLATFORM_ID, ViewChild} from '@angular/core';
import {TranslocoPipe} from '@jsverse/transloco';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'about-us',
  imports: [TranslocoPipe],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.scss'
})
export class AboutUsComponent implements  AfterViewInit, OnDestroy {
  @ViewChild('subtitle') subtitleRef!: ElementRef;
  isVisible = false;
  displayedText = '';
  private fullText = '';
  private observer!: IntersectionObserver;
  private readonly platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    setTimeout(() => {
      this.fullText = this.subtitleRef.nativeElement.textContent;
      this.displayedText = '';
    }, 0);

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.isVisible = true;
          this.startTypingAnimation();
          this.observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (this.subtitleRef?.nativeElement) {
      this.observer.observe(this.subtitleRef.nativeElement);
    }
  }

  private startTypingAnimation(): void {
    let index = 0;
    const speed = 50; // Milliseconds per character
    const type = () => {
      if (index < this.fullText.length) {
        this.displayedText += this.fullText.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        this.subtitleRef.nativeElement.style.borderRight = 'none';
      }
    };
    setTimeout(type, 100);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

import { Directive, ElementRef, Renderer2, OnDestroy } from '@angular/core';

@Directive({
  selector: '[inView]'
})
export class InViewDirective implements OnDestroy {
  private observer: IntersectionObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'in-view');
          this.observer.disconnect(); // наблюдение не требуется после появления
        }
      },
      { threshold: 0.1 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}

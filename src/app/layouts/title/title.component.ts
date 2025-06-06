import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'custom-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent implements AfterViewInit {
  @Input() text: string = 'Expertise in Data Science and Artificial Intelligence';

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target); // Убираем, если хотим анимацию один раз
        }
      });
    }, { threshold: 0.3 });

    const separators = document.querySelectorAll('.separator-container');
    separators.forEach(el => observer.observe(el));
  }



}

import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {TranslocoPipe} from '@jsverse/transloco';
import {AboutUsComponent} from "../about-us/about-us.component";
import {TitleComponent} from '../../layouts/title/title.component';


@Component({
  standalone: true,
  selector: 'app-products',
  imports: [
    CarouselModule,
    NgForOf,
    TranslocoPipe,
    AboutUsComponent,
    TitleComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  carouselOptions = CAROUSEL_OPTIONS;

  slidesStore = [
    {
      id: '1',
      src: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=800&q=80',
      alt: 'Beach',
      title: 'Морской бриз',
      description: 'Освежающая прогулка вдоль берега.'
    },
    {
      id: '2',
      src: 'https://images.unsplash.com/photo-1745750747228-d7ae37cba3a5?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'Mountains',
      title: 'Горный вид',
      description: 'Покой и величие альпийских вершин.'
    },
    {
      id: '3',
      src: 'https://plus.unsplash.com/premium_photo-1745048707599-fd51adbf7356?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      alt: 'City',
      title: 'Городская панорама',
      description: 'Ночной мегаполис в огнях.'
    },
    {
      id: '4',
      src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80',
      alt: 'Forest',
      title: 'Лесная тропа',
      description: 'Тихая прогулка среди зелени.'
    },
    {
      id: '5',
      src: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=800&q=80',
      alt: 'Desert',
      title: 'Песчаные дюны',
      description: 'Магия заката в пустыне.'
    }
  ];
}

export const CAROUSEL_OPTIONS = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['', ''],
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 4
    }
  },
  nav: true
};

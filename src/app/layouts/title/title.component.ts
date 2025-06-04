import {Component, Input} from '@angular/core';

@Component({
  selector: 'custom-title',
  imports: [],
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss'
})
export class TitleComponent {
  @Input() text: string = 'Expertise in Data Science and Artificial Intelligence';

}

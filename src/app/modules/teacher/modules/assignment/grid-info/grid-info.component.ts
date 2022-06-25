import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-grid-info',
  templateUrl: './grid-info.component.html',
  styleUrls: ['./grid-info.component.scss'],
  animations: [
    trigger('fade', [
      state('void', style({'opacity': 0})),
      transition('void =>*, * => void', [
        animate(500)
      ])
    ])
  ]
})
export class GridInfoComponent implements OnInit {
  @Output() tabSelected = new EventEmitter();
  infoList = [
    {name: 'Single Choice', desc: 'Questions where user can choose only one option', image: 'single.svg', icon: 'radio_button_checked'},
    {name: 'Multiple Choice', desc: 'Questions where user can choose more than one option', image: 'multiple.svg', icon: 'check_box'},
    {name: 'Likert Scale', desc: 'Numeric question gives you an option to rate within a range', image: 'numeric.svg', icon: 'looks_3'},
    {name: 'Free Text', desc: 'Question for the users, where users are free to write their opinion as text', image: 'freetext.svg', icon: 'text_format'},
    {name: 'Grid', desc: 'You can add grid question', image: 'image.svg', icon: 'grid_on'},
    {name: 'Image', desc: 'You can give images as options of a question', image: 'image.svg', icon: 'photo'},
  ];

  constructor() { }

  ngOnInit(): void {
    console.log('grid info loaded', this.infoList);

  }

  chooseType(choice: any, i: any): any {
     this.tabSelected.emit(i + 1);
  }
}

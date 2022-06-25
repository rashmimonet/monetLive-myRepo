import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ApiService } from 'src/app/modules/shared/services/api.service';

@Component({
  selector: 'app-cardDetails',
  templateUrl: './cardDetails.component.html',
  styleUrls: ['./cardDetails.component.scss'],
})
export class CardDetailsComponent implements OnInit, OnChanges {
  cardLength: boolean = false;
  cardData: any= [];
  userDetails: any = [];
  deleteEventId: any;
  @Input() cards: any;
  cardDetails: any;
  @Output() onDelete: EventEmitter<void> = new EventEmitter();

  public deleteCard() {
   this.onDelete.emit();
  }
  constructor(private api: ApiService) {}

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'));
    this.api.getApiStatic(`cardsDetails?email=${this.userDetails.email}`).subscribe((cardData: any)=>{
      this.cardData = cardData.cards;
      if(this.cardData.length === 1){
        this.cardLength = true;
      }
      else{
        this.cardLength = false;
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.cards) {
      this.cardDetails = changes.cards.currentValue;
      // console.log('card', this.cardDetails);
      
    }
  }
//   deleteCard(event: any){
//     // debugger
//     // console.log('cards d', this.cards);
//     // document.getElementById('card').style.display = 'none';
// this.deleteEventId = event;
// console.log('delete', this.deleteEventId);
// delete this.deleteEventId;
//   }
}

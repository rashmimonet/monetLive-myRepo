import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SocketService} from '../../../../../shared/services/socket.service';

@Component({
  selector: 'app-single-select-question',
  templateUrl: './single-select-question.component.html',
  styleUrls: ['./single-select-question.component.css']
})
export class SingleSelectQuestionComponent implements OnInit, OnChanges {

  @Input() input_question: any;
  @Output() newEvent2 = new EventEmitter<{ numb: number}>();

  question: SingleSelectQuestion | undefined;
  timer: number = 30;
  answer_text: string = '';

  constructor(private socketService: SocketService) {
  }

  ngOnInit(): void {
    const interval = setInterval(() => {
      if(this.timer <= 30){
        this.timer = this.timer - 1;
      }
      if(this.timer === 0) {
        this.submitAnswer();
        clearInterval(interval);
      }
    }, 1000);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.question = changes.input_question.currentValue;
  }

  submitAnswer() {
    this.socketService.generateSocket();
    this.socketService.socket.emit('submit-answer', {
        uuid: localStorage.getItem('student_uuid'),
        id: localStorage.getItem('assignment_id'),
        assignment: [{
          question_id: this.question._id,
          answer: this.answer_text
        }]
      });
    this.newEvent2.emit({numb: this.question.question_label});
  }

}

interface SingleSelectQuestion {
  _id?: string;
  question_type?: string;
  question_label?: number;
  question?: string;
  options?: Array<any>;
  answer?: any;
}

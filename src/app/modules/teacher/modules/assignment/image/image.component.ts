import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  questionForm: any;
  @Output() tabSelected = new EventEmitter();
  @Output() outputQuestions = new EventEmitter();
  @Output() updateQuestion = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      question: new FormControl(''),
      options: this.fb.array([ this.createOptions()]),
      questionImage: [''],
      questionType: new FormControl('image'),
      freetext: new FormControl(false),
      none: new FormControl(false),
      others: new FormControl(false),
      qs_flags: this.fb.group({
        opt_shuffle: [0]
      })
    });
  }

  createOptions(): FormGroup {
    return this.fb.group({
      option: new FormControl(''),
      children: [],
      optionImage: [''],
      opt_flags: this.fb.group({
        opt_reject: [0]
      }),
    });
  }

}

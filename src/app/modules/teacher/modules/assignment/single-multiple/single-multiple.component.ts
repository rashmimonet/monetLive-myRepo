import {Component, OnInit, Output, EventEmitter, Input, ElementRef, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-single-multiple',
  templateUrl: './single-multiple.component.html',
  styleUrls: ['./single-multiple.component.scss']
})
export class SingleMultipleComponent implements OnInit {
  @ViewChild('question') private question: ElementRef | undefined;
  @Output() tabSelected = new EventEmitter();
  @Output() outputQuestions = new EventEmitter();
  @Output() deleteQuestion = new EventEmitter();
  @Input() type: any;
  @Input() languages: any;
  questionForm: any;
  previewForm: FormArray;
  // group: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    // this.form = this.createForm();
    this.previewForm = this.fb.array([]);
  }

  cancel(): any {
    this.tabSelected.emit(0);
    // this.router.navigate(['teacher/test']);
  }

  ngOnInit(): void {
    this.questionForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      question: [''],
      options: this.fb.array([ this.createOptions('normal'), this.createOptions('normal'), this.createOptions('normal'), this.createOptions('normal') ]
      ),
      question_image: [''],
      questionType: new FormControl(this.type),
      height: new FormControl('33'),
      qs_flags: this.fb.group({
        opt_shuffle: 0,
        opt_max: [],
        opt_min: [],
      })
    });
  }

  createOptions(type: any): FormGroup {
    return this.fb.group({
      opt_id: [''],
      option: new FormControl({
        value: type === 'none' ? 'None of these' : type === 'others' ? 'Other than these options' : type === 'freetext' ? 'You are free to write your views' : '',
        disabled: false
      }),
      type,
      // autofocus: true,
      opt_flags: this.fb.group({
        opt_reject: 0,
        opt_fixed: 0
      }),
      children: []
    });
  }

  submit(): void {
    // console.warn('submitted :', this.questionForm.getRawValue());
    this.outputQuestions.emit(this.questionForm.getRawValue());
    this.questionForm = this.createForm();
 /*   this.specialQuestioknTypes.map(type => {
      if (this.questionForm.get(type)) {
        this.questionForm.get(type)
          .valueChanges
          .subscribe(value => {
            const options = this.questionForm.get('options') as FormArray;
            if (value) {
              options.insert(options.controls.length, this.createOptions(type));
            } else {
              options.removeAt(options.value.findIndex(option => option.type === type));
            }
          });
      }
    });*/
  }

}

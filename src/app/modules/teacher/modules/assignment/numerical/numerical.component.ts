import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-numerical',
  templateUrl: './numerical.component.html',
  styleUrls: ['./numerical.component.scss'],
  animations: [
    trigger('fade',[
      state('void', style({opacity: 0})),
      transition('void =>*, * => void', [
        animate(500)
      ])
    ])
  ]
})
export class NumericalComponent implements OnInit {
  @Output() tabSelected = new EventEmitter();
  @Output() outputQuestions = new EventEmitter();
  items = Array(5).fill(1).map((fil, i) => fil = i + 1);
  exitems = Array(5).fill(1).map((fil, i) => fil = i + 1);
  questionForm: any;


  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.questionForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      question: new FormControl('', ),
      questionType: new FormControl('numeric'),
      num_value: new FormControl(10, ),
      qs_flags: this.fb.group({
        reverse: [false]
      }),
      extreme_like: new FormControl('Extremely likely'),
      not_like: new FormControl('Not likely'),
    });
  }

  handleOutputQuestions(event: any, update: any): any {
    /*    if (this.child) {
          const params = Object.assign({}, this.form.value);
          params['survey'] = event;
          this.childSave.emit(params);
          return 0;
        }
        if (update ? true : this.surveyQuestions ? this.surveyQuestions.length < this.plan.pre_survey.max : true) {
          let end = 'createSurvey';
          let formData;
          if (!update) {
            if (event.question) {
              this.form.get('cnt_id').setValue(localStorage.getItem('cnt_map_id'));
              formData = Object.assign({}, this.form.value);
              formData['survey'] = event;
              if (formData['cms_id'] === '') {
                delete formData.cms_id;
              }
            } else {
              formData = event;
              end = 'createImageSurvey';
              end = this.cluster ? 'createCmpImageSurvey' : 'createImageSurvey';
            }
          } else {
            if (event.survey && event.survey.question) {
              formData = event;
            } else {
              formData = event.survey;
              end = this.cluster ? 'createCmpImageSurvey' : 'createImageSurvey';
            }
          }
          this._ss.surveyPost(formData, end)
            .subscribe(success => {
              if (success['response']['survey']) {
                this._as.obNotify({status: success['message'] === 'ok' ? 'success' : 'success', message: success['message'], start: true, code: Number(success['code'])});
                const defaultQuestion = [];
                defaultQuestion['survey'] = success['response'].survey.filter((dq) => dq.import_check !== null);
                // console.logdefaultQuestion, 'default question');
                this.setDefaultQuestionData(defaultQuestion);

                defaultQuestion['survey'] = success['response'].survey.filter((dq) => dq.import_check === null);
                this.setData(defaultQuestion);
                // this.setData(questions);
              }
            });
        } else {
          this._as.obNotify({status: 'error', message:  'upgrade your current plan to add more questions', start: true});
        }*/
  }

}

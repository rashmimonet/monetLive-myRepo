import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-free-text',
  templateUrl: './free-text.component.html',
  styleUrls: ['./free-text.component.scss']
})
export class FreeTextComponent implements OnInit {
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
      question: new FormControl('', ),
      questionType: new FormControl('freetext')
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

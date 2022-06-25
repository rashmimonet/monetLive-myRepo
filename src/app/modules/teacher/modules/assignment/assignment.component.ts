import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AlertDialogComponent} from './alert-dialog/alert-dialog.component';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit , OnChanges{
  selectedTab = 0;
  delParams: any;
  languages: any[] = [1, 9];
  form: FormGroup | any;


  constructor(private dialog: MatDialog) {
    this.languages = [];
  }

  ngOnInit(): void {
    // console.warn('Assignment Component Loaded');
  }

 ngOnChanges(changes: SimpleChanges): void {
    // console.warn('Check :', changes);
 }

  handleOutputQuestions(event: any, update: any): any {
    if (event.options && event.options.length) {
      event.options = event.options.filter((op: any) => op.option !== '');
    }
    let formData;
    if (!update) {
      if (event.question) {
        formData = Object.assign({}, this.form.value);
      } else {
        formData = event;
      }
    } else {
      if (event.survey && event.survey.question) {
        formData = event;
      } else {
        formData = event.survey;
      }
    }
  }

  deleteQuestions(event: any): any {
    if (!this.delParams) {
      const data = {head: 'Delete question', msg: 'Want to Delete?', yes: 'Delete', no: 'Cancel'};
      const dialogref = this.dialog.open(AlertDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data,
        width: '350px',
        height: '250px',
        panelClass: 'deleteCampaigns'
      });
      dialogref.afterClosed().subscribe(next => {
        this.delParams = undefined;
        if (next === 'yes') {
         /* this._ss.surveyDelete('quesOptDelete?' + event).subscribe(success => {
            if (success && success[`response`][`survey`]) {
              this.updateQuestionCount(success['response'].survey, this.surveyType);
              this._as.obNotify({status: success['message'] === 'deleted!' ? 'error' : 'success', message: success['message'], start: true, code: Number(success['code'])});
              setTimeout( () => {
                success['response'].survey = success['response'].survey.filter((dq) => !dq.import_check);
                this.setData(success['response']);
              });
            } else {
              this._as.obNotify({status: 'error', message: success['message'], start: true, code: Number(success['code'])});
            }
          });*/
        }
      });
    }
  }

}

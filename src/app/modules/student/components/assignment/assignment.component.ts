import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SocketService} from "../../../shared/services/socket.service";

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {

  form: any;
  question_number: any;
  question_text: any;
  question_options: Array<any> = [];
  answer: Array<any> = [];
  assignmentData: any;
  question_id: string | undefined;
  assignmentId: string | undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private socketService: SocketService,
              private dialogRef: MatDialogRef<AssignmentComponent>) {
    // this.assignmentData = data;
    // this.assignmentId = this.assignmentData.assignment._id;
    // this.question_number = 'Q1';
    // this.question_id = this.assignmentData.assignment.questions[0]._id;
    // this.question_text = this.assignmentData.assignment.questions[0].question;
    // this.question_options = this.assignmentData.assignment.questions[0].options;
  }

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        'opt_ans': new FormControl()
      }
    );
  }

  submitAnswer() {
    this.answer.push({question_id: this.question_id, answer: this.form.value.opt_ans});
    this.socketService.generateSocket();
    this.socketService.socket.emit('submit-answer', {
        uuid: localStorage.getItem('student_uuid'),
        id: this.assignmentId,
        assignment: this.answer
      }
    );
    this.dialogRef.close(this.form);
  }

}

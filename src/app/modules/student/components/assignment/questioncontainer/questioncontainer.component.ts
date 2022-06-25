import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog'
import {AssignmentComponent} from "../assignment.component";

@Component({
  selector: 'app-questioncontainer',
  templateUrl: './questioncontainer.component.html',
  styleUrls: ['./questioncontainer.component.css']
})
export class QuestioncontainerComponent {

  assignment: any = [];
  assignment1: any | undefined;

  // @ts-ignore
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<AssignmentComponent>) {
    this.assignment1 = this.data;
    localStorage.setItem('assignment_id', this.assignment1.assignment._id);
    this.assignment.push(this.assignment1.assignment.questions[0]);
  }

  logNavigation(event: any): void {
    const numb: number = this.assignment1.assignment.questions.length;
    if(numb !== event.numb) {
      this.assignment.pop();
      this.assignment.push(this.assignment1.assignment.questions[event.numb]);
    }
  }

}

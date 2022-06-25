import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import {SharedModule} from '../shared/shared.module';
import { WaitingRoomComponent } from './components/waiting-room/waiting-room.component';
import { MeetingEndComponent } from './components/meeting-end/meeting-end.component';
import { RequestRejectedComponent } from './components/request-rejected/request-rejected.component';
import { CallNotStartedComponent } from './components/call-not-started/call-not-started.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import {QuestioncontainerComponent} from './components/assignment/questioncontainer/questioncontainer.component';
import {SingleSelectQuestionComponent} from './components/assignment/questioncontainer/single-select-question/single-select-question.component';
import {MultiSelectQuestionComponent} from './components/assignment/questioncontainer/multi-select-question/multi-select-question.component';
import {FreeTextQuestionComponent} from './components/assignment/questioncontainer/free-text-question/free-text-question.component';

@NgModule({
  declarations: [StudentComponent, WaitingRoomComponent, MeetingEndComponent, RequestRejectedComponent, CallNotStartedComponent, AssignmentComponent, QuestioncontainerComponent, SingleSelectQuestionComponent, MultiSelectQuestionComponent, FreeTextQuestionComponent],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }

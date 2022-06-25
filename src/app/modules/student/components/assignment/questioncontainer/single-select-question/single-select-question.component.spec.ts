import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSelectQuestionComponent } from './single-select-question.component';

describe('SingleSelectQuestionComponent', () => {
  let component: SingleSelectQuestionComponent;
  let fixture: ComponentFixture<SingleSelectQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleSelectQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSelectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

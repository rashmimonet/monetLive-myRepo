import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectQuestionComponent } from './multi-select-question.component';

describe('MultiSelectQuestionComponent', () => {
  let component: MultiSelectQuestionComponent;
  let fixture: ComponentFixture<MultiSelectQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiSelectQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestioncontainerComponent } from './questioncontainer.component';

describe('QuestioncontainerComponent', () => {
  let component: QuestioncontainerComponent;
  let fixture: ComponentFixture<QuestioncontainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestioncontainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestioncontainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

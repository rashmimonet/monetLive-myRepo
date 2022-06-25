import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-write-question',
  templateUrl: './write-question.component.html',
  styleUrls: ['./write-question.component.scss']
})
export class WriteQuestionComponent implements OnInit, AfterViewInit, OnChanges {
  actions = [];
  textFormat: any;
  @Input() question: FormControl | any;

  constructor() { }

  ngOnInit(): void {
  }

  contextMenu(e: any): void {
    this.textFormat = e;
  }
  ngAfterViewInit(): void {
  }
  /*changeDetected(e: any): any {
    this.question.setValue(e);
  }*/
  ngOnChanges(sc: SimpleChanges): any {
    /*console.log(sc);*/
  }

}

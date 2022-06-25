import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  pageSize!: number;
  pageIndex!: number;
  length!: number;
  goTo!: number;
  totalRecords!: number;
  pageNumbers!: number[];
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @Input() disabled = false;
  @Input() hidePageSize = false;
  @Input() pageSizeOptions!: number[];
  @Input() showFirstLastButtons = false;
  @Output() page = new EventEmitter<PageEvent>();
  @Input('pageIndex') set pageIndexChanged(pageIndex: number) {
    this.pageIndex = pageIndex;
  }
  @Input('length') set lengthChanged(length: number) {
    this.length = length;
    this.updateGoto();
  }
  @Input('pageSize') set pageSizeChanged(pageSize: number) {
    this.pageSize = pageSize;
    this.updateGoto();
  }

  @Input('records') set totalRecordsChanged(recordsLength: number) {
    this.totalRecords = recordsLength;
    this.updateGoto();
  }


  constructor() {}

  ngOnInit(): void {
    this.updateGoto();
  }

  updateGoto(): void {
    this.goTo = (this.pageIndex || 1);
    this.pageNumbers = [];
    /*for (let i = 1; i <= Math.ceil(this.length / this.pageSize); i++) {
      this.pageNumbers.push(i);
    }*/
    for (let i = 1; i <= this.length; i++) {
      this.pageNumbers.push(i);
    }
  }

  paginationChange(pageEvt: PageEvent): void {
    // this.length = pageEvt.length;
    this.pageIndex = pageEvt.pageIndex;
    this.pageSize = pageEvt.pageSize;
    this.updateGoto();
    this.emitPageEvent(pageEvt);
  }

  goToChange(pageNum: number): void {
    // this.paginator.pageIndex = pageNum - 1;
    this.paginator.pageIndex = pageNum;
    const event: PageEvent = {
      length: this.paginator.length,
      pageIndex: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize
    };
    this.paginator.page.next(event);
    this.emitPageEvent(event);
  }

  emitPageEvent(pageEvent: PageEvent): void {
    this.page.next(pageEvent);
  }

}

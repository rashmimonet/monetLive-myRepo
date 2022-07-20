import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/modules/shared/services/api.service';
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
// ];
@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.scss']
})
export class AssignmentComponent implements OnInit {
  displayedColumns: string[] = ['index', 'name', 'totalQuestion', 'overallEngagement', 'overallMood', 'score'];
  dataSource: MatTableDataSource<any> | undefined;
  roomId: any;
  score: any = [];
  msg: any = '';
  stopLoading: boolean = false;
  constructor(public dialogRef: MatDialogRef<AssignmentComponent>,
    private as: ApiService,
    private route: ActivatedRoute,) {
    this.route.queryParams.subscribe(next => {
      if (next) {
        this.roomId = next.roomid;
      }
    });
  }

  ngOnInit(): void {
    this.getAssignment();
  }
  getAssignment() {
    this.as.getApiStatic('assignmentscore?roomid=' + this.roomId).subscribe((response: any) => {
      if (response) {
        hideloading();
      }
      this.score = response.score;
      if (this.score.length === 0) {
        this.msg = 'No Assignment';
      } else {
        this.msg = '';
      }
    });
    function hideloading() {
      document.getElementById('loading')
        .style.display = 'none';
    }
  }
}



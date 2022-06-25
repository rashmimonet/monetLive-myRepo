import { Component, OnInit } from '@angular/core';
import {SocketService} from '../shared/services/socket.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  constructor(private ss: SocketService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  dragZoneActive: any;

  onDrop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragZoneActive = false;
    this.submit(event);
  }
  onDragOver(evt: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragZoneActive = true;
  }

  onDragLeave(evt: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragZoneActive = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

  submit(e: any): any {

  }
}

import {Component, ComponentFactoryResolver, Inject, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container: any;
  components = [];
  form: FormGroup | any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private resolver: ComponentFactoryResolver,
              public dialogRef: MatDialogRef<AlertDialogComponent>,
              private fb: FormBuilder) { }

  addComponent(componentClass: Type<any>, config: any): any {
    const componentFactory = this.resolver.resolveComponentFactory(componentClass);
    const component = this.container.createComponent(componentFactory);
    component.instance.campaignData = config;
    // @ts-ignore
    this.components.push(component);
  }

  ngOnInit(): any {
    if (this.data.component) {
      this.addComponent(this.data.component, this.data.data);
    }
    if (this.data.camp) {
      this.form = this.fb.group({
        cmp_name: new FormControl(this.data.camp.cmp_name, Validators.required),
        cmp_description: new FormControl(this.data.camp.cmp_description, Validators.required),
        cmp_id: new FormControl(localStorage.getItem('cmp_id'))
      });
    }
  }

}

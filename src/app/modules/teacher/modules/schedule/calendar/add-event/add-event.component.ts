import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {COMMA, ENTER, SPACE} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {ApiService} from '../../../../../shared/services/api.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
  providers: [ApiService]
})
export class AddEventComponent implements OnInit {

  observerAccess: boolean = false;
  endDate: any;
  eventForm: FormGroup;
  date = new Date();
  videoUri: any;
  emailids: Array<string> = [];
  selectedFile: any;
  topicRegex = /^[a-zA-Z][A-Za-z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  emailRegExp = /^([a-z0-9_\.\-])+\@(([a-z0-9\-])+\.)+([a-z0-9]{2,4})+$/;
  readonly separatorKeysCodes: number[] = [ ENTER, COMMA, SPACE ];
  addOnBlur = true;
  chipError: any;
  selectable = true;
  removable = true;
  calDateSelect: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<AddEventComponent>) {
    this.eventForm  = this.fb.group({
      summary: ['', [Validators.required, Validators.pattern(this.topicRegex)]],
      description: ['', Validators.required],
      observerEmail: [{value: '', disabled: !JSON.parse(localStorage.getItem('userPlanDetails') || '{}').observerAccess}, Validators.pattern(this.emailRegExp)],
      start: fb.group({
        dateTime: [data?.calDateSelect !== undefined ? new Date(data.calDateSelect) : this.date, Validators.required],
        timeZone: [Intl.DateTimeFormat().resolvedOptions().timeZone]
      }),
      recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
      conferenceData: this.fb.group( {
        entryPoints: this.fb.array([
          this.fb.group({
            entryPointType: ['video'],
            uri: ['https://dev.monetrewards.com/monetEdu/student/login?roomid=123'],
            label: ['monet education']
          })
        ]),
        conferenceSolution: this.fb.group({
          name: ['Monet Education Conference'],
          iconUri: ['https://dev.monetrewards.com/logom.png']
        }),
        notes: ['There are some notes'],
      }),
      attendees: ['',Validators.required],
      link: ['Monet Education', Validators.required],
      reminders: fb.group({
        useDefault: [false],
        overrides: fb.array([
          fb.group({method: ['email'], minutes: [24 * 60]}),
          fb.group({method: ['popup'], minutes: 10})
        ])
      })
    });
    this.endDate = new Date(new Date(this.eventForm?.get('start')?.get('dateTime')?.value).getTime() + 60 * 60 * 1000);
  }

  ngOnInit(): void {
    this.observerAccess =  !JSON.parse(localStorage.getItem('userPlanDetails') || '{}').observerAccess;
  }

  add(event: MatChipInputEvent): void {
    if ((event.value || '').trim()) {
      if (this.emailRegExp.test(event.value) === false) {
        this.chipError = event.value + ' is not an email address';
      } else {
        this.chipError = '';
        this.emailids.push(event.value.trim());
        console.log(this.emailids)
        this.eventForm.controls['attendees'].setValue(this.emailids);
      }
    }
    event.input.value = '';
  }

  remove(email: any): void {
    this.emailids.indexOf(email) >= 0 ? this.emailids.splice(this.emailids.indexOf(email), 1) : ''
      // console.log('email Id', this.emailids);
  }

  onFileChanged(event: any): any {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
        return;
      }
    const reader = new FileReader();
    reader.onload = (e: any) =>  {
        const contents = e.target.result.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        contents?.forEach((id: any) => {
          this.emailids.push(id);
        });
      };
    reader.readAsText(this.selectedFile);
  }

  valueChanged(type: string): void {
   /* if (type === 'endDate') {
      const resolution = new Date(this.eventForm?.get('end')?.get('dateTime')?.value).getTime() - new Date(this.eventForm?.get('start')?.get('dateTime')?.value).getTime();
      const gap = Math.floor(((resolution / 1000) / 60) / 60);
      this.dateError = gap > 0 || Math.floor((resolution / 1000) / 60) <= 0;
    }
    else if (type === 'startDate') {
      this.eventForm?.get('end')?.get('dateTime')?.setValue(new Date(new Date(this.eventForm?.get('start')?.get('dateTime')?.value).getTime() + 60 * 60 * 1000));
    }*/
    if (type === 'startDate') {
      // this.eventForm?.get('end')?.get('dateTime')?.setValue(new Date(new Date(this.eventForm?.get('start')?.get('dateTime')?.value).getTime() + 60 * 60 * 1000));
      this.endDate = new Date(new Date(this.eventForm?.get('start')?.get('dateTime')?.value).getTime() + 60 * 60 * 1000);
      // console.log('End Date :', this.endDate);
    }
  }

}

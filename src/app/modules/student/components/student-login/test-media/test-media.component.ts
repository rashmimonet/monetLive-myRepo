import { Component, OnInit } from '@angular/core';
import {ScriptLoadService} from '../../../../shared/services/script-load.service';
import {catchError} from 'rxjs/operators';
import {ApiService} from '../../../../shared/services/api.service';
import {MatDialogRef} from '@angular/material/dialog';
import {UtilityService} from "../../../../shared/services/utility.service";

declare var mediaDev: any;

@Component({
  selector: 'app-test-media',
  templateUrl: './test-media.component.html',
  styleUrls: ['./test-media.component.scss'],
  providers: [ScriptLoadService, ApiService]
})
export class TestMediaComponent implements OnInit {
  audioEl: any;
  audio: any;
  audioUrl: any;
  onceVideo = false;
  onceAudio = false;
  interval: any;
  selectedOption: any = {
    Label: '',
    id: ''
  };
  barArray = new Array(5);
  deviceList: any = {};
  media = new MediaStream();
  settings: any = [
    {
      icon: 'mic',
      name: 'Mic',
      action: '',
      content: 'Tab one content'
    },
    {

      icon: 'speaker',
      name: 'Speaker',
      action: '',
      content: 'Tab one content'
    },
    {
      icon: 'videocam',
      name: 'Camera',
      action: '',
      content: 'Tab two content'
    },
  ];
  constructor(private sl: ScriptLoadService, private as: ApiService,private utility: UtilityService, public dialogRef: MatDialogRef<TestMediaComponent>) { }

  ngOnInit(): void {
    this.getAvailableDevicesList();
    this.sl.load('janus').then((user: any) => {
      this.sl.load('user').then((janus: any) => {
        if (user[0].loaded && janus[0].loaded) {
          mediaDev.enumerate();
        }
      });
    });
  }

  notify(stat: boolean): void {
    this.utility.notify(stat ? 'Good! You are good to go.' : 'Please check your speaker settings and try again.', '');
  }

  testAudioOutputDevice(): any {
    this.audioEl = document.getElementById('testAudio') as HTMLAudioElement;
    this.audioEl.src = '../../../../../../assets/testAudio.mp3';
    this.audioEl.load();
    this.audioEl.play();
  }

  async getAvailableDevicesList(): Promise<any> {
    this.deviceList = await navigator.mediaDevices.enumerateDevices();
    this.deviceList = this.deviceList.reduce((acc: any, obj: any) => {
      const key = obj[`kind`];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  }

  selectDevice(val: any, kind: string): any {
    const {label, deviceId} = this.deviceList[kind].filter((el: any) => el.deviceId === val.value)[0];
    this.selectedOption = {Label: label, id: deviceId};
   /*   if (el.deviceId === val.value) {
        return el;
      }
    })[0];*/
  }

  testVideoDevice(): void {
    mediaDev.on('media', (media: any) => {
      this.media = media;
      const videoElement = document.getElementById('testVideo') as HTMLVideoElement;
      if (videoElement && this.media) {
        [videoElement.srcObject, videoElement.muted] = [this.media, true];
      }
    });
    if (!this.onceVideo) {
      mediaDev.start(true, false);
      this.onceVideo = true;
    }
    mediaDev.deltaMedia(this.selectedOption.Label, this.selectedOption.id);
  }

  testAudioDevice(): void {
    mediaDev.on('media', (media: any) => this.media = media);
    if (!this.onceAudio) {
      mediaDev.start(false, true);
      this.onceAudio = true;
    }
    mediaDev.deltaMedia(this.selectedOption.Label, this.selectedOption.id);
    this.soundVisualizer();
  }


  soundVisualizer(): void {
    const context = new AudioContext();
    navigator.getUserMedia({audio: true}, (stream) => {
      const track = context.createMediaStreamSource(stream);
      const gainNode = context.createGain();
      const analyzer = context.createAnalyser();
      track.connect(gainNode);
      track.connect(analyzer);
      // track.connect(context.destination);
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      function draw(): void {
        requestAnimationFrame(draw);
        analyzer.getByteFrequencyData(dataArray);
        let values = 0;
        const length = dataArray.length;
        for (let i = 0; i < length; i++) {
          values += (dataArray[i]);
        }
        const average = values / length;
        colorBars(average);
      }

      function colorBars(vol: any): any {
        let allBars: any = document.getElementsByClassName('bar');
        const amountOfBars = Math.round(vol / 4);
        allBars = Array.prototype.slice.call(allBars);
        const elemRange = allBars.slice(0, amountOfBars);
        allBars.forEach((element: any) => {
          element.style.backgroundColor = '#e6e7e8';
        });
        for (let i = 0; i < elemRange.length; i++) {
          elemRange[i].style.backgroundColor = '#69ce2b';
        }
      }
      draw();
    }, error => {
      console.error(error);
    });
  }

  close(): void {

  }

}

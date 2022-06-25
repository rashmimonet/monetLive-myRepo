import { Injectable } from '@angular/core';
@Injectable()
export class InternetSpeedService {
  constructor() {
  }
  speedTest(): any {
    const img = new Image();
    const size = 392 * 8;
    const start = new Date().getTime();
    img.src = 'http://dev.monetrewards.com/internet-speed.png';
    img.addEventListener('load', (e) => {
      const diff = (new Date().getTime() - start) / 1000;
      console.log(size / diff, 'Kbps');
    });
  }
}

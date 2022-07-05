import { Injectable } from '@angular/core';
declare function io(url: string, extra?: any): any;

declare let socket: any;

declare let dynamoLink: any;
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: any;

  constructor() {
  }

  generateSocket(): any {
    try {
      if (!socket) {
        this.socket = io(`https://www.monetlive.com`, {
          path: `/35_89_97_246/sock`,
          transports: ['websocket'],
          reconnect: true
        });
      } else {
        this.socket = socket;
      }
    } catch (e) {
      this.socket = io(`https://www.monetlive.com`, {
        path: `/35_89_97_246/sock`,
        transports: ['websocket'],
        reconnect: true
      });
    }

    this.socket.on('disconnect', (e: any) => {
      console.log('socket disconnect', e);
    });
  }

  disconnectSocket(): void {
    this.socket.disconnect();
  }

  managerSocket(grp: string): void {
    this.socket = io(`https://www.monetlive.com`, {path: `/${grp}/sock`, transports: ['websocket'], reconnect: true});
  }
}

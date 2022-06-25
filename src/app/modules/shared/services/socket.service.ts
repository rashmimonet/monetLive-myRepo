import {Injectable} from '@angular/core';

declare function io(url: string, extra?: any): any;

declare var socket: any;

declare var dynamoLink: any;

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket: any;

  constructor() {
  }

  generateSocket(): any {
    try {
      if (!socket) {
        this.socket = io(`https://www.monetlive.com`, {
          path: `/${dynamoLink}/sock`,
          transports: ['websocket'],
          reconnect: true
        });
      } else {
        this.socket = socket;
      }
    } catch (e) {
      this.socket = io(`https://www.monetlive.com`, {
        path: `/${dynamoLink}/sock`,
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

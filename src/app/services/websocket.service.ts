import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

// declare function io(url: string, extra?: any): any;

declare let socket: any;
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  socket: any;
  notification: any;
  notifications: any = [];
  userDetails: any = JSON.parse(localStorage.getItem('userDetails') || '{}');
  constructor() {
  }
  // generateSocket(): any {
  //   try {
  //     if (!socket) {
  //       this.socket = io(`wss://www.monetlive.com`, {
  //         path: `/sock/`,
  //         transports: ['websocket'],
  //       });
  //     } else {
  //       this.socket = socket;
  //     }
  //   } catch (e) {
  //     this.socket = io(`wss://www.monetlive.com`, {
  //       path: `/sock/`,
  //       transports: ['websocket'],
  //     });
  //   }

  //   this.socket.on('connection', (e: any) => {
  //     console.log('socket connection', e);
  //   });
  //   const params = {
  //     sender: this.userDetails.email
  //   }
  //   socket.emit('notify', params, () => {
  //   });
  //   socket.on('message', (request: any) => {
  //     this.notifications.push(request);
  //     this.notification = this.notifications.length;
  //   })
  // }

  // actionOnRequest(button: any) {
  //   socket.emit('sendNotifications', {
  //     message: `You clicked on ${button}`,
  //     sender: this.userDetails.email,
  //     receiver: this.userDetails.email
  //   }, () => {

  //   })
  // }


 
  // public getNewMessage = () =>{
  //   this.socket.on('notification',function(data: any){
  //     alert(data)
  // });
  // this.socket.on('message', (message: any)=>{
  //   this.message.next(message);
  // });
  // return this.message.asObservable();
}



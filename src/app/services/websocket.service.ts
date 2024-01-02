import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';  
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: Socket;
  constructor() {
    this.socket = io(environment.SOCKET_ENDPOINT);
  
   }


   public getDangerItems():Observable<any>{
    return new Observable((observer) => {
      this.socket.on('chat message', (message) => {
        observer.next(message);
      });
    });
   }

   public emitAllItemsInNotification(items:any[]){
    this.socket.emit("items", items)
   }
}

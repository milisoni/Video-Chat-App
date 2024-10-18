import { Injectable } from '@angular/core';
import SimplePeer from 'simple-peer';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  constructor() { 
  }

  public peer!: SimplePeer.Instance;

  initializePeer(isInitiator: boolean, stream: MediaStream) {
    this.peer = new SimplePeer({ initiator: isInitiator, stream });

    this.peer.on('signal', data => {
      // Send signaling data to server
    });

    this.peer.on('stream', remoteStream => {
      // Handle incoming video stream
    });
  }

  connectToPeer(signalData: any) {
    this.peer.signal(signalData);
  }

  endCall() {
    this.peer.destroy();
  }
}

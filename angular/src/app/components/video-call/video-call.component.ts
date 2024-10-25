import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { VideoCallService } from '../../services/video-call.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, RouterLink, RouterLinkActive, HttpClientModule],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss'
})
export class VideoCallComponent{

  @ViewChild('localVideo', { static: true }) localVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo', { static: true }) remoteVideo!: ElementRef<HTMLVideoElement>;

  localStream: MediaStream | null = null;
  remoteStream: MediaStream | null = null;

  constructor(private videoCallService: VideoCallService) {}

  async startCall() {
    try {
      // Get local media stream
      this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.localVideo.nativeElement.srcObject = this.localStream;

      // Initialize peer connection
      this.videoCallService.initializePeer(true, this.localStream);

      // Handle remote stream in service
      this.videoCallService.peer.on('stream', (stream: MediaStream) => {
        this.remoteStream = stream;
        this.remoteVideo.nativeElement.srcObject = this.remoteStream;
      });

      // Example: signaling could be done here
      // this.videoCallService.connectToPeer(signalData);
      
    } catch (error) {
      console.error('Error starting call:', error);
    }
  }

  endCall() {
    this.videoCallService.endCall();
    this.localStream?.getTracks().forEach(track => track.stop());
    this.localVideo.nativeElement.srcObject = null;
    this.remoteVideo.nativeElement.srcObject = null;
    this.localStream = null;
    this.remoteStream = null;
  }
  // localStream!: MediaStream;
  // remoteStream!: MediaStream;

  // constructor(private videoCallService: VideoCallService) {}

  // ngOnInit() {
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then(stream => {
  //       this.localStream = stream;
  //       this.videoCallService.initializePeer(true, stream);
  //     });
  // }
}

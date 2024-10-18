import { Component, OnInit } from '@angular/core';
import { VideoCallService } from '../../services/video-call.service';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.scss'
})
export class VideoCallComponent implements OnInit{
  localStream!: MediaStream;
  remoteStream!: MediaStream;

  constructor(private videoCallService: VideoCallService) {}

  ngOnInit() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        this.localStream = stream;
        this.videoCallService.initializePeer(true, stream);
      });
  }
}

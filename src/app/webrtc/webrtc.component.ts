import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import Peer from 'peerjs';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit {
  @ViewChild("me", { static: false }) me: any;
  @ViewChild("em", { static: false }) em: any;
  peer: Peer;

  constructor(private authenticationService: AuthenticationService) { }

  async ngOnInit() {
    try {

      var user = await this.authenticationService.getUser();

      // init peerjs
      this.peer = new Peer(user.uid);

      // show camera
      var myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.me.nativeElement.muted = true;
      this.me.nativeElement.srcObject = myStream;

      // listen for call
      this.peer.on('call', (call) => {

        // Answer the call with an A/V stream.
        call.answer(myStream);

        call.on('stream', (remoteStream) => {
          // Show stream in some <video> element.
          this.em.nativeElement.srcObject = remoteStream
        });
      });

    }
    catch (err) {

      switch (err['name']) {
        case 'NotAllowedError':
          // user needs to give permission for camera

          break;
      }
    }
  }

}

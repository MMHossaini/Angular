import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import Peer from 'peerjs';
import { Location } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-webrtc',
  templateUrl: './webrtc.component.html',
  styleUrls: ['./webrtc.component.scss']
})
export class WebrtcComponent implements OnInit, OnDestroy {

  ngOnDestroy(): void {
    this.peer.destroy()
  }
  @ViewChild("me", { static: false }) me: any;
  @ViewChild("em", { static: false }) em: any;
  peer: Peer;
  callLink: string;
  constructor(private angularFirestore: AngularFirestore, private authenticationService: AuthenticationService, private loc: Location) { }

  async ngOnInit() {
    try {

      // init peerjs
      this.peer = new Peer({ debug: environment.production ? 0 : 3 });

      // save peerid
      this.peer.on('open', (id) => {
        this.callLink = window.location.href + '/call/' + id;
      });

      // show camera
      var myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.me.nativeElement.muted = true;
      this.me.nativeElement.srcObject = myStream;

      // listen for call
      this.peer.on('call', (call) => {

        if (confirm('Answer call')) {

          // Answer the call with an A/V stream.
          call.answer(myStream);

          call.on('stream', (remoteStream) => {
            // Show stream in some <video> element.
            this.em.nativeElement.srcObject = remoteStream
          });

          call.on('close', function () {
            alert('closed')
          });

          call.on('error', (err) => {
            alert('error')
          });
        }
      });

      // listen for PEERJS ERRORS
      this.peer.on('error', (err) => {
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


  getRandomID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);

  }

}

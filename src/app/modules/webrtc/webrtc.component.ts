import { Component, OnInit, ViewChild, OnDestroy, ViewChildren, QueryList } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
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

  @ViewChild("me") me: any;
  @ViewChild("em") em: any;

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
          this.answerCall(call);
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

  answerCall(call) {
    
    // Answer the call with an A/V stream.
    call.answer(this.me.nativeElement.srcObject);

    call.on('stream', (remoteStream) => {
      // Show stream in some <video> element.
      this.em.nativeElement.srcObject = remoteStream
    });

    call.on('close', (err) => {
      // remove call
      this.closeCall(call)
    });

    call.on('error', (err) => {
      // remove call
      console.log('error')
    });
  }

  closeCall(call) {
  }

  ngOnDestroy(): void {
    this.peer.destroy()

    // stop stream
    let stream = this.me.nativeElement.srcObject;
    stream.getTracks().forEach(track => track.stop());
  }

}

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ActivatedRoute } from '@angular/router';
import Peer from 'peerjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.peer.destroy()
  }
  @ViewChild("me", { static: false }) me: any;
  @ViewChild("em", { static: false }) em: any;
  peer: Peer;
  connecting: boolean = true;
  call;

  constructor(private angularFirestore: AngularFirestore, private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  async ngOnInit() {
    try {

      // init peerjs
      this.peer = new Peer({ debug: 3 });

      // show my face 
      var myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.me.nativeElement.muted = true;
      this.me.nativeElement.srcObject = myStream;

      // wait until we are connected
      this.peer.on('open', (id) => {

        // call the person
        this.call = this.peer.call(this.route.snapshot.params.id, myStream);

        this.call.on('stream', (remoteStream) => {

          this.connecting = false;
          // Show stream in some <video> element.
          this.em.nativeElement.srcObject = remoteStream;

        });

      });


      // listen for call
      this.peer.on('error', (call) => {
        debugger;
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

  endCall() {
    this.call.close();
  }

}
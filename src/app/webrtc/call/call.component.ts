import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { ActivatedRoute } from '@angular/router';
import Peer from 'peerjs';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @ViewChild("me", { static: false }) me: any;
  @ViewChild("em", { static: false }) em: any;
  peer: Peer;

  constructor(private authenticationService: AuthenticationService, private route: ActivatedRoute) { }

  async ngOnInit() {
    try {
      var user = await this.authenticationService.getUser();

      // init peerjs
      this.peer = new Peer(user.uid);

      // show my face 
      var myStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      this.me.nativeElement.muted = true;
      this.me.nativeElement.srcObject = myStream;
      // get id of the person we want to call
      var id = this.route.snapshot.params.id;

      // call the person
      var call = this.peer.call(id, myStream);

      call.on('stream', (remoteStream) => {
        // Show stream in some <video> element.
        this.em.nativeElement.srcObject = remoteStream;
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
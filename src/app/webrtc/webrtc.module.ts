import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebrtcRoutingModule } from './webrtc-routing.module';
import { WebrtcComponent } from './webrtc.component';
import { CallComponent } from './call/call.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material';


@NgModule({
  declarations: [WebrtcComponent, CallComponent],
  imports: [
    CommonModule,
    WebrtcRoutingModule,
    QRCodeModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class WebrtcModule { }

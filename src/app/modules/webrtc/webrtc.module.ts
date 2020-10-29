import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebrtcRoutingModule } from './webrtc-routing.module';
import { WebrtcComponent } from './webrtc.component';
import { CallComponent } from './call/call.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [WebrtcComponent, CallComponent],
  imports: [
    CommonModule,
    WebrtcRoutingModule,
    QRCodeModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule
  ]
})
export class WebrtcModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebrtcRoutingModule } from './webrtc-routing.module';
import { WebrtcComponent } from './webrtc.component';
import { CallComponent } from './call/call.component';


@NgModule({
  declarations: [WebrtcComponent, CallComponent],
  imports: [
    CommonModule,
    WebrtcRoutingModule
  ]
})
export class WebrtcModule { }

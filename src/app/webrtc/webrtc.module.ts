import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebrtcRoutingModule } from './webrtc-routing.module';
import { WebrtcComponent } from './webrtc.component';


@NgModule({
  declarations: [WebrtcComponent],
  imports: [
    CommonModule,
    WebrtcRoutingModule
  ]
})
export class WebrtcModule { }

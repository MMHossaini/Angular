import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebrtcComponent } from './webrtc.component';

const routes: Routes = [{ path: '', component: WebrtcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebrtcRoutingModule { }

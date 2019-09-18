import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebrtcComponent } from './webrtc.component';
import { CallComponent } from './call/call.component';

const routes: Routes = [
  { path: '', component: WebrtcComponent }
  , { path: 'call/:id', component: CallComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebrtcRoutingModule { }

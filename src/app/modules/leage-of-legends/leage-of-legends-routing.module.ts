import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeageOfLegendsComponent } from './leage-of-legends.component';

const routes: Routes = [{ path: '', component: LeageOfLegendsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeageOfLegendsRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeageOfLegendsRoutingModule } from './leage-of-legends-routing.module';
import { LeageOfLegendsComponent } from './leage-of-legends.component';


@NgModule({
  declarations: [LeageOfLegendsComponent],
  imports: [
    CommonModule,
    LeageOfLegendsRoutingModule
  ]
})
export class LeageOfLegendsModule { }

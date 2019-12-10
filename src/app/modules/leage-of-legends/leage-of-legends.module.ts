import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatChipsModule } from "@angular/material/chips";
import { HttpClientModule } from "@angular/common/http";

import { LeageOfLegendsRoutingModule } from "./leage-of-legends-routing.module";
import { LeageOfLegendsComponent } from "./leage-of-legends.component";

@NgModule({
  declarations: [LeageOfLegendsComponent],
  imports: [
    CommonModule,
    LeageOfLegendsRoutingModule,
    MatTableModule,
    MatChipsModule,
    HttpClientModule
  ]
})
export class LeageOfLegendsModule {}

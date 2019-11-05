import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubeConverterComponent } from './youtube-converter.component';

const routes: Routes = [{ path: '', component: YoutubeConverterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YoutubeConverterRoutingModule { }

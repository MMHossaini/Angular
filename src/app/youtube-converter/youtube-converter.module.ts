import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeConverterRoutingModule } from './youtube-converter-routing.module';
import { YoutubeConverterComponent } from './youtube-converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatCardModule, MatInputModule, MatButtonModule, MatRadioModule } from '@angular/material';

@NgModule({
  declarations: [YoutubeConverterComponent],
  imports: [
    CommonModule,
    YoutubeConverterRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule
  ]
})
export class YoutubeConverterModule { }

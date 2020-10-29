import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YoutubeConverterRoutingModule } from './youtube-converter-routing.module';
import { YoutubeConverterComponent } from './youtube-converter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

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

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-youtube-converter',
  templateUrl: './youtube-converter.component.html',
  styleUrls: ['./youtube-converter.component.scss']
})
export class YoutubeConverterComponent {

  form: FormGroup
  constructor(private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({
      videoURL: ['https://www.youtube.com/watch?v=hlznpxNGFGQ&list=RDhlznpxNGFGQ&start_radio=1', [Validators.required]],
      type: ['audioonly', [Validators.required]]

    })
  }

  convert() {
    let link = document.createElement('a');
    link.setAttribute('type', 'hidden');
    link.download = 'test.ino';
    link.href =
      environment.herokuUrl
      + "downloadYoutube?videoUrl=" +
      this.form.value.videoURL +
      "&filter=" + this.form.value.type;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }


}

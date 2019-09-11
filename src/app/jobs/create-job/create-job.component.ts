import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatabaseService } from '../../shared/database.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss']
})
export class CreateJobComponent {
  newJobForm: FormGroup;

  constructor(private db: DatabaseService, formBuilder: FormBuilder, private _snackBar: MatSnackBar) {

    this.newJobForm = formBuilder.group({
      name: ['', [Validators.required]]
      , price: ['', [Validators.required]]
      , uberPickUp: [false, Validators.required]

    });
  }
  async saveChanges(publish) {
    // if form is valid 
    if (this.newJobForm.valid) {


      var job = await this.db.AddJob({
        name: this.newJobForm.value.name,
        price: this.newJobForm.value.price,
        uberPickUp: this.newJobForm.value.uberPickUp,
        isPublished: publish === true
      })

      if (job) {
        this._snackBar.open('Your job is created', null, {
          duration: 4000,
        });
      }
    }
  }

}

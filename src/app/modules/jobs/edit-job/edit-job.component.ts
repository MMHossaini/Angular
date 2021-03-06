import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent {

  @Input() job;
  editJobForm: FormGroup;
  constructor(afs: AngularFirestore, private db: DatabaseService, formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.editJobForm = formBuilder.group({
      name: ['', [Validators.required]]
      , price: ['', [Validators.required]]
      , uberPickUp: [false, Validators.required]

    });
  }

  async saveChanges(publish = false) {
    // if form is valid 
    if (this.editJobForm.valid) {
      this._snackBar.open('Your job is saved', null, {
        duration: 4000,
      });

    }
  }

}


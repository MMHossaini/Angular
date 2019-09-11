import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatabaseService } from '../../shared/database.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.scss']
})
export class JobsDashboardComponent {
  jobs: Observable<any[]>;

  constructor(afs: AngularFirestore, private db: DatabaseService, formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.jobs = afs.collection('jobs').valueChanges();

  }
}

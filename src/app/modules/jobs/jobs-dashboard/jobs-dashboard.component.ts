import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material';
import { Job } from 'src/app/shared/job';
import { map } from 'rxjs/operators';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-jobs-dashboard',
  templateUrl: './jobs-dashboard.component.html',
  styleUrls: ['./jobs-dashboard.component.scss']
})
export class JobsDashboardComponent {
  private jobsCollection: AngularFirestoreCollection<Job>;
  jobs: Observable<Job[]>;
  selectedJob;

  constructor(private afs: AngularFirestore, private db: DatabaseService, formBuilder: FormBuilder, private _snackBar: MatSnackBar) {
    this.jobsCollection = afs.collection<Job>('jobs');
    this.jobs = this.jobsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Job;
        const $key = a.payload.doc.id;
        return { $key, ...data };
      }))
    );
  }

  async toggleIsPublished(job: Job) {
    let updateJob = await this.afs.doc(`/jobs/${job.$key}`);
    updateJob.update({
      isPublished: !job.isPublished
    })

    this._snackBar.open('job updated', null, {
      duration: 4000,
    });
  }
}

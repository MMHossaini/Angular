import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job } from './models/job';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private angularFirestore: AngularFirestore) { }

  AddJob(job: Job) {
    return this.angularFirestore.collection('jobs').add(job);
  }
}

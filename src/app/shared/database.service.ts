import { Injectable } from '@angular/core';
import { Job } from './job';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private angularFirestore: AngularFirestore) { }

  AddJob(job: Job) {

    return this.angularFirestore.collection('jobs').add(job);
  }
}

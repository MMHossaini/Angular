import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Job } from './models/job';
import { User } from './models/user';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private angularFirestore: AngularFirestore) { }

  addJob(job: Job) {
    return this.angularFirestore.collection('jobs').add(job);
  }

  updateUser(user: User) {
    return this.angularFirestore.doc(`users/${user.$key}`).set({
      firstName: user.firstName,
      lastName: user.lastName,
    }, { merge: true });
  }
  
  async getUserById(id) {
    return this.angularFirestore.doc(`users/${id}`).valueChanges().pipe(first()).toPromise();
  }
}

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase';
// import firebase from '@firebase/app';

@Component({
  selector: 'app-my-profile-page',
  templateUrl: './my-profile-page.component.html',
  styleUrls: ['./my-profile-page.component.scss']
})
export class MyProfilePageComponent {
  constructor(private afAuth: AngularFireAuth, private authenticationService: AuthenticationService, private _snackBar: MatSnackBar) { }

  async deleteAccount() {
    var user = await this.authenticationService.getUser();
    if (user) {

      // ask the user if they are sure to go ahead and delete
      var yesDelete = confirm('lets go and delete your account')
      if (yesDelete) {
        user.delete();
      }

    }
  }

  async  linkWithGoogle() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.linkWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
          this._snackBar.open('You have linked successffully linked your account with google', null, {
            duration: 4000
          });
        })
      }
    })

  }

  async  linkWithTwitter() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.linkWithPopup(new firebase.auth.TwitterAuthProvider()).then(function (result) {

          this._snackBar.open('You have linked successffully linked your account with twitter', null, {
            duration: 4000
          });
        })
      }
    })

  }

  async  linkWithGithub() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.linkWithPopup(new firebase.auth.GithubAuthProvider()).then(function (result) {

          this._snackBar.open('You have linked successffully linked your account with github', null, {
            duration: 4000
          });
        })
      }
    })
  }

  async  linkWithFacebook() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        user.linkWithPopup(new firebase.auth.FacebookAuthProvider()).then(function (result) {
          this._snackBar.open('You have linked successffully linked your account with facebook', null, {
            duration: 4000,
          });
        })
      }
    })

  }
}

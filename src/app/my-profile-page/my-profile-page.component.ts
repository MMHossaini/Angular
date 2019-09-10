import { Component, OnInit } from '@angular/core';
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
export class MyProfilePageComponent implements OnInit {
  isGoogleLinked;
  isFacebookLinked;
  isTwitterLinked;
  isGithubLinked;

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
  
  async ngOnInit() {
    var user = await this.authenticationService.getUser();
    var linkedAccounts = user.providerData;

    this.isGoogleLinked = linkedAccounts.filter(e => e.providerId === 'google.com').length > 0;
    this.isFacebookLinked = linkedAccounts.filter(e => e.providerId === 'facebook.com').length > 0;
    this.isTwitterLinked = linkedAccounts.filter(e => e.providerId === 'twitter.com').length > 0;
    this.isGithubLinked = linkedAccounts.filter(e => e.providerId === 'github.com').length > 0;
  }
  // if the currentuser is linked with the priveder it will unlink
  // otherwise it will try to link
  async toogleLinkWithProvider(providerId) {
    try {

      var user = await this.authenticationService.getUser()

      if (user) {

        // check if current user is linked with provider
        let isLinkedWithProvider = user.providerData.filter(e => e.providerId === providerId).length > 0

        if (isLinkedWithProvider) {
          let result = await user.unlink(providerId);

          if (result) {
            this._snackBar.open(providerId + ' Account unlinked', null, {
              duration: 4000
            });
          }
        }
        else {

          var provider;
          switch (providerId) {
            case 'google.com':
              provider = new firebase.auth.GoogleAuthProvider()
              break;
            case 'facebook.com':
              provider = new firebase.auth.FacebookAuthProvider()
              break;
            case 'twitter.com':
              provider = new firebase.auth.TwitterAuthProvider()
              break;
            case 'github.com':
              provider = new firebase.auth.GithubAuthProvider()
              break;
          }

          var result = await user.linkWithPopup(provider)

          this._snackBar.open('You have linked successffully linked your account with ' + providerId, null, {
            duration: 4000
          });
        }
      }
    }
    catch (err) {

      switch (err['code']) {
        case 'auth/credential-already-in-use':
          this._snackBar.open('The account you are trying to link to is already conneted to another account', null, {
            duration: 4000
          });
          break;
      }
    }

  }
}

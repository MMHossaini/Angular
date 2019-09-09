import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import * as firebase from 'firebase';

const emailForLoginLocalStorageKey = 'emailForLoginIn';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginInForm: FormGroup;
  user: Observable<any>;
  constructor(private afAuth: AngularFireAuth, private authenticationService: AuthenticationService, private route: Router, private formBuilder: FormBuilder, private _snackBar: MatSnackBar) {

    this.user = this.afAuth.authState;

    this.loginInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    //Checks if an incoming link is a sign-in with email link.
    // forward to newProfilePage if the user doesnt have a profile
    if (this.afAuth.auth.isSignInWithEmailLink(this.route.url)) {
      this.confirmLogin();
    }
  }

  // sends a link to the email address enetered by the user in the email form
  // when the users clicks the link they get sent to the confirmSignIn link with some parameters that firebase 
  // trys to use and authenticate the user
  async submitLogInForm() {

    // make sure the email form is valid
    if (this.loginInForm.valid) {
      const actionCodeSettings = {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be whitelisted in the Firebase Console.
        url: window.location.origin + '/login',
        handleCodeInApp: true
      };

      // grab the email from the form values
      let email = this.loginInForm.value.email;

      try {

        // tell the user what to do next
        this._snackBar.open('Nice!, Please check your email now and click the link to log in', null, {
          duration: 4000,
        });

        // we store the email the user wishes to get sign in link with in the local storage
        // and we read it back in confirmation page when the user clicks the link they get sent in email
        window.localStorage.setItem(emailForLoginLocalStorageKey, email);

        await this.afAuth.auth.sendSignInLinkToEmail(
          email,
          actionCodeSettings
        );
      }
      catch (err) {
        this._snackBar.open(err['message'], null, {
          duration: 4000,
        });
      }
    }
  }

  async confirmLogin() {
    let email = window.localStorage.getItem(emailForLoginLocalStorageKey);

    // If missing email, prompt user for it
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }

    // wait to sign in
    await this.afAuth.auth.signInWithEmailLink(email, this.route.url);

    // remove the email from localStorage
    window.localStorage.removeItem(emailForLoginLocalStorageKey);

    // forward to newProfilePage if the user doesnt have a profile
    // @question , what happens when user goes back from new Profile page to confirm page
    // @TODO
    this.route.navigate(['/newProfile']);

    this._snackBar.open('Welcome ' + email, null, {
      duration: 4000,
    });
  }

  async loginWithProvider(provider) {
    return firebase.auth().signInWithPopup(provider)
  }

  async logInWithGoogle() {
    // log in with google
    var credential = await this.loginWithProvider(new firebase.auth.GoogleAuthProvider())

    if (credential.user) {
      // we have logged in successfully
      this._snackBar.open('Welcome ' + credential.user.displayName, null, {
        duration: 4000,
      });
      // 
    }

  }

  async loginWithFacebook() {
    // log in with facebook
    var credential = await this.loginWithProvider(new firebase.auth.FacebookAuthProvider())

    if (credential.user) {
      // we have logged in successfully
      this._snackBar.open('Welcome ' + credential.user.displayName, null, {
        duration: 4000,
      });
      // 
    }
  }

  async loginWithGithub() {
    // log in with github
    var credential = await this.loginWithProvider(new firebase.auth.GithubAuthProvider())

    if (credential.user) {
      // we have logged in successfully
      this._snackBar.open('Welcome ' + credential.user.displayName, null, {
        duration: 4000,
      });
      // 
    }
  }

  async loginWithTwitter() {
    // log in with twitter
    var credential = await this.loginWithProvider(new firebase.auth.TwitterAuthProvider())

    if (credential.user) {
      // we have logged in successfully
      this._snackBar.open('Welcome ' + credential.user.displayName, null, {
        duration: 4000,
      });
      // 
    }
  }

}



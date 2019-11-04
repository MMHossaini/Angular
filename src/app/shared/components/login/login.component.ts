import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../shared/authentication.service';
import * as firebase from 'firebase';
const emailForLoginLocalStorageKey = 'emailForLoginIn';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginInForm: FormGroup;
  showProgress = false;
  isEmailSent = false;
  user: Observable<any>;
  user$: Observable<firebase.User>;

  constructor(

    private afAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private route: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar

  ) {

    this.user$ = authenticationService.getUser$();

    this.user = this.afAuth.authState;

    this.loginInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  // sends a link to the email address enetered by the user in the email form
  // when the users clicks the link they get sent to the confirmSignIn link with some parameters that firebase 
  // trys to use and authenticate the user
  async submitLogInForm() {
    try {

      // make sure the email form is valid
      if (this.loginInForm.valid) {

        const actionCodeSettings = {
          // URL you want to redirect back to. The domain (www.example.com) for this
          // URL must be whitelisted in the Firebase Console.
          url: this.authenticationService.getConfirmLoginURL(),
          handleCodeInApp: true
        };

        let email = this.loginInForm.value.email;

        // save email
        this.authenticationService.saveEmailForConfirmLogin(email);

        // show progress
        this.showProgress = true;

        await this.afAuth.auth.sendSignInLinkToEmail(
          email,
          actionCodeSettings
        );

        this.showProgress = false;
        this.isEmailSent = true;
      }
    }
    catch (err) {
      this.showProgress = false;
      switch (err['code']) {
        case 'auth/operation-not-allowed':
          this._snackBar.open('You need to enable Email Link Passwordless sign in in your firebase console project', null, {
            duration: 4000,
          });
          break;

        default:
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


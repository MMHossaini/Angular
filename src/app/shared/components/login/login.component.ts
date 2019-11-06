import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../shared/authentication.service';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

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

    // check if this is a signInWithEmailLink
    if (this.afAuth.auth.isSignInWithEmailLink(this.route.url)) {
      this.showProgress = true;
      this.confirmLogin();
    }

  }

  // sends a link to the email address enetered by the user in the email form
  // when the users clicks the link they get sent to the confirmSignIn link with some parameters that firebase 
  // trys to use and authenticate the user
  async submitLogInForm() {
    try {

      // make sure the email form is valid
      if (this.loginInForm.valid) {


        let email = this.loginInForm.value.email;

        // save email
        this.authenticationService.saveEmailForConfirmLogin(email);

        // show progress
        this.showProgress = true;

        await this.afAuth.auth.sendSignInLinkToEmail(
          email,
          {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: window.location.origin + '/login',
            handleCodeInApp: true
          }
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
    let email = this.authenticationService.getLoginEmail();

    if (email) {
      // wait to sign in
      let userCredential = await this.afAuth.auth.signInWithEmailLink(email, this.route.url);

      // remove the email from localStorage
      window.localStorage.removeItem(email);

      // update user
      await this.authenticationService.updateUser(userCredential.user);

      this.route.navigate(['/profile']);

      this._snackBar.open('Welcome ' + email, null, {
        duration: 4000,
      });
    }
  }

}


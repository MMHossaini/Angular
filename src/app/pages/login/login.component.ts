import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { AuthenticationService } from 'src/app/shared/authentication.service';
import { DatabaseService } from 'src/app/shared/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginInForm: FormGroup;
  showLoading: boolean = false;
  showLoggingIn: boolean = false;
  user: Observable<any>;
  user$: Observable<firebase.User>;

  constructor(

    private afAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private route: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private databaseService: DatabaseService

  ) {

    this.user$ = authenticationService.getUser$();
    this.user = this.afAuth.authState;
    this.loginInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // check if this is a signInWithEmailLink
    if (this.afAuth.auth.isSignInWithEmailLink(this.route.url)) {
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

        // show loading
        this.showLoading = true;

        await this.afAuth.auth.sendSignInLinkToEmail(
          email,
          {
            // URL you want to redirect back to. The domain (www.example.com) for this
            // URL must be whitelisted in the Firebase Console.
            url: window.location.origin + '/login',
            handleCodeInApp: true
          }
        );

        this.showLoading = false;
        this._snackBar.open('Please check your mail box, you should have recieved an email link in your email to instantly log in', null, {
          duration: 4000,
        });
      }
    }
    catch (err) {
      this.showLoading = false;
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

  // when the user clicks on the email link
  // this gets called from the constructor
  async confirmLogin() {
    try {
      this.showLoggingIn = true;

      let email = this.authenticationService.getLoginEmail();

      if (email) {
        // wait to sign in
        let userCredential = await this.afAuth.auth.signInWithEmailLink(email, this.route.url);

        // remove the email from localStorage
        window.localStorage.removeItem(email);

        let doesUserExist: any = await this.databaseService.getUserById(userCredential.user.uid);

        // if user exists
        if (doesUserExist) {
          this._snackBar.open('Welcome back ' + doesUserExist.firstName, null, {
            duration: 4000,
          });

          this.route.navigate(['/']);
        }
        else {
          this.route.navigate(['/new-user']);

          this._snackBar.open('Welcome to the app ' + email + ' , Please create a profile', null, {
            duration: 4000,
          });
        }

        // update user
        await this.authenticationService.updateUser(userCredential.user);
      }
    } catch (err) {
      this.showLoggingIn = false;
      switch (err['code']) {
        case 'auth/invalid-action-code':
          this._snackBar.open('Expired link', null, {
            duration: 10000,
          });
          break;

        default:
          this._snackBar.open(err['message'], null, {
            duration: 4000,
          });
      }
    }
  }

}


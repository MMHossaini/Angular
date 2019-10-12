import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import firebase from 'firebase';

@Component({
  selector: 'app-confirm-login',
  templateUrl: './confirm-login.component.html',
  styleUrls: ['./confirm-login.component.scss']
})
export class ConfirmLoginComponent {
  showProgress = true;
  user: Observable<any>;
  user$: Observable<firebase.User>;

  constructor(

    private afAuth: AngularFireAuth,
    private authenticationService: AuthenticationService,
    private route: Router,
    private _snackBar: MatSnackBar

  ) {

    this.user$ = authenticationService.getUser$();

    this.user = this.afAuth.authState;
    this.confirmLogin();
  }
  async confirmLogin() {

    try {
      debugger;
      let emailLink = this.route.url;
      if (this.afAuth.auth.isSignInWithEmailLink(emailLink)) {
        // wait to sign in
        var cred = await this.authenticationService.signInWithEmailLink(emailLink);

        if(cred.user) {
        
        }
        return cred;
      }
    }
    catch (err) {
      this.showProgress = false;
      this._snackBar.open(err['message'], null, {
        duration: 4000,
      });
    }

  }

}


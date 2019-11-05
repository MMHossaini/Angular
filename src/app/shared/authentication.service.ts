import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';


const emailKey = 'email';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private afAuth: AngularFireAuth) { }

  getUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  // observable version of getUser()
  getUser$() {
    return this.afAuth.authState
  }

  logOut() {
    this.afAuth.auth.signOut();
  }

  /**
   * saves this email in the localstorage for later 
   * when user clicks the link in their email
   * @param email 
   */
  saveEmailForConfirmLogin(email: string) {
    window.localStorage.setItem(emailKey, email);
  }


  /**
  * Returns the email the user last tried to login with.
  * if it doesnt find it, it will prompt the user for it 
  */
  getLoginEmail() {
    let email = window.localStorage.getItem(emailKey);

    // If missing email, prompt user for it
    if (!email) {
      email = window.prompt('Please provide your email for confirmation');
    }

    return email;

  }

  async signInWithEmailLink(emailLink: string) {
    if (this.afAuth.auth.isSignInWithEmailLink(emailLink)) {

      // wait to sign in
      var cred = await this.afAuth.auth.signInWithEmailLink(this.getLoginEmail(), emailLink);

      // remove the email from localStorage
      window.localStorage.removeItem(emailKey);

      return cred;
    }
  }
}

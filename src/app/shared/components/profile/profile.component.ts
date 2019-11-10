import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { DatabaseService } from '../../database.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  firebaseUser: any;
  user: User;
  user$: Observable<User>;
  userForm: FormGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])

  });
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private databaseService: DatabaseService
  ) { }

  async ngOnInit() {
    this.firebaseUser = await this.authenticationService.getUser();
    this.user = await this.databaseService.getUserById(this.firebaseUser.uid);
    this.user$ = this.databaseService.getUserById$(this.firebaseUser.uid);
    this.userForm.patchValue({
      'email': this.firebaseUser.email,
      'lastName': this.user.lastName,
      'firstName': this.user.firstName,
    });

  }

  async submitUserForm() {
    // if form is valid 
    if (this.userForm.valid) {

      await this.databaseService.updateUser({
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.firebaseUser.email,
        $key: this.firebaseUser.uid
      });

      this._snackBar.open('Saved', null, {
        duration: 4000,
      });

    }
  }

}

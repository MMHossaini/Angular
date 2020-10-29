import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatabaseService } from '../../database.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  loggedInUser: any;
  newUserForm: FormGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required])

  });
  constructor(
    private authenticationService: AuthenticationService,
    private route: Router,
    private _snackBar: MatSnackBar,
    private databaseService: DatabaseService,
  ) { }

  async ngOnInit() {
    this.loggedInUser = await this.authenticationService.getUser();
    this.newUserForm.patchValue({
      'email': this.loggedInUser.email
    });

  }

  async submitNewUserForm() {
    // if form is valid 
    if (this.newUserForm.valid) {

      await this.databaseService.updateUser({
        firstName: this.newUserForm.value.firstName,
        lastName: this.newUserForm.value.lastName,
        email: this.loggedInUser.email,
        $key: this.loggedInUser.uid
      });

      this._snackBar.open('Well done ' + this.newUserForm.value.firstName + ', You are good to go', null, {
        duration: 4000,
      });

      this.route.navigate(['/']);

    }
  }
  
}

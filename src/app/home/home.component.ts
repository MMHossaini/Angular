import { Component } from '@angular/core';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  user$;

  constructor(private authenticationService: AuthenticationService, private route: Router) {
    this.user$ = authenticationService.getUser$();
  }

}

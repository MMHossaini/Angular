import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  user$;

  constructor(private authenticationService: AuthenticationService, private route: Router) {
    this.user$ = authenticationService.getUser$();
  }

  logOut() {
    this.authenticationService.logOut();
  }

  goToProfile() {
    this.route.navigate(['/profile']);
  }

}

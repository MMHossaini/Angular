import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  
  constructor(private auth: AuthenticationService, private route: Router) { }

  async canActivate(): Promise<boolean> {
    const user = await this.auth.getUser();
    const loggedIn = !!user;

    if (!loggedIn) {
      this.route.navigate(['/login']);
    }

    return loggedIn;
  }
}

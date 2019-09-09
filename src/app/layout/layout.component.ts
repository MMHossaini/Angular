

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  isLoggedIn;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private route: Router, private afAuth: AngularFireAuth, public authenticationService: AuthenticationService, ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  goToProfile() {
    this.route.navigate(['/myProfile']);
  }

  async logOut() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
  }

  async ngOnInit() {
    var user = await this.authenticationService.getUser();
    this.isLoggedIn = !!user;
  }
}


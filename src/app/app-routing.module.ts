import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { NewProfilePageComponent } from './new-profile-page/new-profile-page.component';
import { AuthenticationGuard } from './shared/authentication.guard';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { ConfirmLoginComponent } from './shared/components/confirm-login/confirm-login.component';
import { CONFIRM_LOGIN_PATH } from './shared/authentication.service';


const routes: Routes = [

  // landing page route
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path: CONFIRM_LOGIN_PATH,
    component: ConfirmLoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'login', component: LoginPageComponent },
      { path: 'myProfile', component: MyProfilePageComponent, canActivate: [AuthenticationGuard] },
      { path: 'newProfile', component: NewProfilePageComponent }
      , { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) }
      , { path: 'youtube', loadChildren: () => import('./youtube-converter/youtube-converter.module').then(m => m.YoutubeConverterModule) }
      , { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
    ]
  }
  , { path: 'webrtc', loadChildren: () => import('./webrtc/webrtc.module').then(m => m.WebrtcModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

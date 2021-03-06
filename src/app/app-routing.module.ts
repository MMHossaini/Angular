import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { NewUserComponent } from './shared/components/new-user/new-user.component';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'new-user', component: NewUserComponent },
      // modules
      { path: 'jobs', loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule) },
      { path: 'youtube', loadChildren: () => import('./modules/youtube-converter/youtube-converter.module').then(m => m.YoutubeConverterModule) },
      { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
      { path: 'webrtc', loadChildren: () => import('./modules/webrtc/webrtc.module').then(m => m.WebrtcModule) },
      { path: 'lol', loadChildren: () => import('./modules/leage-of-legends/leage-of-legends.module').then(m => m.LeageOfLegendsModule) }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

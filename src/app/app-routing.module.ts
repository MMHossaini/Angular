import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationGuard } from './shared/authentication.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { NewUserComponent } from './shared/components/new-user/new-user.component';


const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthenticationGuard] },
      { path: 'new-user', component: NewUserComponent, canActivate: [AuthenticationGuard] },
      // modules
      { path: 'jobs', loadChildren: () => import('./modules/jobs/jobs.module').then(m => m.JobsModule) },
      { path: 'youtube', loadChildren: () => import('./modules/youtube-converter/youtube-converter.module').then(m => m.YoutubeConverterModule) },
      { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
      { path: 'webrtc', loadChildren: () => import('./modules/webrtc/webrtc.module').then(m => m.WebrtcModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

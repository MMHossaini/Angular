import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPage1Component } from './demo-page1/demo-page1.component';
import { DemoPage2Component } from './demo-page2/demo-page2.component';
import { DemoPage3Component } from './demo-page3/demo-page3.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { NewProfilePageComponent } from './new-profile-page/new-profile-page.component';
import { AuthenticationGuard } from './shared/authentication.guard';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';


const routes: Routes = [

  // landing page route
  {
    path: '',
    component: ComingSoonPageComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'demoPage1', component: DemoPage1Component },
      { path: 'demoPage2', component: DemoPage2Component },
      { path: 'demoPage3', component: DemoPage3Component },
      { path: 'login', component: LoginPageComponent },
      { path: 'myProfile', component: MyProfilePageComponent, canActivate: [AuthenticationGuard] },
      { path: 'newProfile', component: NewProfilePageComponent }
      , { path: 'jobs', loadChildren: () => import('./jobs/jobs.module').then(m => m.JobsModule) }
    ]
  }
  ,{ path: 'webrtc', loadChildren: () => import('./webrtc/webrtc.module').then(m => m.WebrtcModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

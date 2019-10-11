import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

import { LayoutComponent } from './layout/layout.component';
import { DemoPage1Component } from './demo-page1/demo-page1.component';
import { DemoPage2Component } from './demo-page2/demo-page2.component';
import { DemoPage3Component } from './demo-page3/demo-page3.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MyProfilePageComponent } from './my-profile-page/my-profile-page.component';
import { NewProfilePageComponent } from './new-profile-page/new-profile-page.component';

import { AuthenticationService } from './shared/authentication.service';
import { AuthenticationGuard } from './shared/authentication.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRippleModule } from '@angular/material/core';
import { DatabaseService } from './shared/database.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ComingSoonPageComponent } from './coming-soon-page/coming-soon-page.component';
import { AvatarComponent } from './shared/avatar/avatar.component';
import { LoginComponent } from './shared/components/login/login.component';

@NgModule({
  declarations: [
    AppComponent , LoginComponent
    , LayoutComponent, DemoPage1Component, DemoPage2Component, DemoPage3Component
    , LoginPageComponent, MyProfilePageComponent, NewProfilePageComponent, ComingSoonPageComponent, AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule, AngularFirestoreModule,
    BrowserAnimationsModule // imports firebase/app needed for everything   
    , AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
    , MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatFormFieldModule
    , MatInputModule, MatCardModule, MatMenuModule, MatSnackBarModule, MatSlideToggleModule, MatRippleModule
    , FlexLayoutModule
    , ReactiveFormsModule
    , ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthenticationService, AuthenticationGuard, DatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }

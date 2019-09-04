import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

import { LayoutComponent } from './layout/layout.component';
import { DemoPage1Component } from './demo-page1/demo-page1.component';
import { DemoPage2Component } from './demo-page2/demo-page2.component';
import { DemoPage3Component } from './demo-page3/demo-page3.component';

@NgModule({
  declarations: [
    AppComponent
    , LayoutComponent, DemoPage1Component, DemoPage2Component, DemoPage3Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule // imports firebase/app needed for everything   
    , AgmCoreModule.forRoot({
      apiKey: environment.googleMapsKey
    })
    , MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule
    , FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoPage1Component } from './demo-page1/demo-page1.component';
import { DemoPage2Component } from './demo-page2/demo-page2.component';
import { DemoPage3Component } from './demo-page3/demo-page3.component';
import { LayoutComponent } from './layout/layout.component';


const routes: Routes = [

  // landing page route
  { path: '', redirectTo: 'demoPage1', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'demoPage1', component: DemoPage1Component },
      { path: 'demoPage2', component: DemoPage2Component },
      { path: 'demoPage3', component: DemoPage3Component },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';

const routes: Routes = [{ path: '', component: JobsDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }

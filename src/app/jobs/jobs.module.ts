import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EditJobComponent } from './edit-job/edit-job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCardModule, MatMenuModule, MatSnackBarModule, MatSlideToggleModule, MatRippleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [EditJobComponent, CreateJobComponent, JobsDashboardComponent],
  imports: [
    CommonModule,
    JobsRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonToggleModule, MatIconModule, MatToolbarModule, MatSidenavModule, MatListModule, MatButtonModule, MatFormFieldModule
    , MatInputModule, MatCardModule, MatMenuModule, MatSnackBarModule, MatSlideToggleModule, MatRippleModule
  ]
})
export class JobsModule { }

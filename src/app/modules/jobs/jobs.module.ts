import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { EditJobComponent } from './edit-job/edit-job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobsDashboardComponent } from './jobs-dashboard/jobs-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
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

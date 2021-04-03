import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TimerListComponent } from './components/timer-list/timer-list.component';
import { TimerComponent } from './components/timer/timer.component';
import { PwResetComponent } from './components/pw-reset/pw-reset.component';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorComponent } from './components/error/error.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TimerIntervalsComponent } from './components/timer-intervals/timer-intervals.component';



@NgModule({
  declarations: [
    LoginComponent,
    LogoutComponent,
    SettingsComponent,
    TimerListComponent,
    TimerComponent,
    PwResetComponent,
    ErrorComponent,
    TimerIntervalsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule,
    ReactiveFormsModule,
    DragDropModule, 
  ],
  exports: [
    LoginComponent,
    LogoutComponent,
    SettingsComponent,
    TimerListComponent,
    TimerComponent,
    PwResetComponent, 
    ErrorComponent,
  ],
})
export class TimerAppModule { }

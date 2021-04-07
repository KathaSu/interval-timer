import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './timer-app/components/error/error.component';
import { LoginComponent } from './timer-app/components/login/login.component';
import { LogoutComponent } from './timer-app/components/logout/logout.component';
import { PwResetComponent } from './timer-app/components/pw-reset/pw-reset.component';
import { SettingsComponent } from './timer-app/components/settings/settings.component';
import { TimerListComponent } from './timer-app/components/timer-list/timer-list.component';
import { TimerComponent } from './timer-app/components/timer/timer.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'timer-list', component: TimerListComponent },
  { path: 'pw-reset', component: PwResetComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '**', component: ErrorComponent },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

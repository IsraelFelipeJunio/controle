import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from './login.component';
import {LoginRoutes} from './login.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(LoginRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule {
}

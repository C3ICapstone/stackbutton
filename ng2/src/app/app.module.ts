import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app-routing/app-routing.module';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
// TODO: ensure all of these are still used
import { UserService } from './_services/user.service';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HorizontalNavigationComponent } from './horizontal-navigation/horizontal-navigation.component';
import { EmptystateComponent } from './emptystate/emptystate.component';
import { StatusBoardComponent } from './status-board/status-board.component';
import { TrendCardComponent } from './trend-card/trend-card.component';
import { UtilizationBarComponent } from './utilization-bar/utilization-bar.component';
import { ListViewComponent} from './list-view/list-view.component';

import * as $ from 'jquery';
import { ToolbarComponent } from './toolbar/toolbar.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    LandingComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    HorizontalNavigationComponent,
    EmptystateComponent,
    TrendCardComponent,
    UtilizationBarComponent,
    ListViewComponent,
    StatusBoardComponent,
    ToolbarComponent,
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,

    // providers used to create fake backend
    fakeBackendProvider,
    MockBackend,
    BaseRequestOptions
  ],
  bootstrap: [AppComponent],
  // for patternfly workaround
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AppModule { }

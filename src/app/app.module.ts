import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { IssuesComponent } from './components/issues/issues.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';
import { AddIssueComponent } from './components/add-issue/add-issue.component';
import { EditIssueComponent } from './components/edit-issue/edit-issue.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { IssueService } from './services/issue.service';
import { AuthService } from './services/auth.service';

import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'add-issue', component: AddIssueComponent, canActivate:[AuthGuard]},
  {path: 'issue/:id', component: IssueDetailsComponent, canActivate:[AuthGuard]},
  {path: 'edit-issue/:id', component: EditIssueComponent, canActivate:[AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IssuesComponent,
    IssueDetailsComponent,
    AddIssueComponent,
    EditIssueComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FlashMessagesModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'issuelist'),
    AngularFireAuthModule
  ],
  providers: [
    AngularFireDatabase,
    AngularFireDatabaseModule,
    AuthService,
    AuthGuard,
    FlashMessagesService,
    IssueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './Users/user-list.component';
import { UserDetailsComponent } from './Users/user-details.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './Home/welcome.component';
import {  HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path : 'users' , component : UserProfileComponent},
      {path : 'users/:id', component : UserDetailsComponent},
      {path : 'welcome' , component : WelcomeComponent},
      {path : '' , redirectTo: 'welcome', pathMatch: 'full' },
      {path : '**' , redirectTo : 'welcome', pathMatch : 'full'}
    ])
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { LoginComponent } from './login/login.component';
import { HomeRoutingModule } from './home/home-routing.module';
import { HomeModule } from './home/home.module';
import { SignupRoutingModule } from './signup/signup-routing.module';
import { SignupModule } from './signup/signup.module';
import { LoginRoutingModule } from './login/login-routing.module';
import { LoginModule } from './login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendService } from './backend.service';
import { TokenIncterceptorService } from './token-incterceptor.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LoginModule,
    LoginRoutingModule,
    SignupModule,
    SignupRoutingModule,
    HomeModule,
    HomeRoutingModule,
    Ng2SearchPipeModule
  ],
  providers: [BackendService,LoginComponent,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenIncterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

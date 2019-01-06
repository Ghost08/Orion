import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { PetitionComponent } from './petition/petition.component';
import { AboutComponent } from './about/about.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { AuthGuard } from './auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PetitionComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true
    }),
    HttpClientModule,
    NgxSpinnerModule
  ],
  providers: [AuthService, DataService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }

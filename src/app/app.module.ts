import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './security/login/login.component';
import { InputComponent } from './shared/input/input.component';
import { SnackbarComponent } from './shared/messages/snackbar/snackbar.component';
import { UserDetailComponent } from './header/user-detail/user-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientComponent } from './clients/client/client.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { KzMaskDirective } from './shared/kz-mask.directive';

import { NotificationService } from './shared/messages/notification.service';
import { LoginService } from './security/login/login.service';
import { LoggedInGuard } from './security/loggedin.guard';
import { ClientsService } from './clients/clients.service';
import { AuthInterceptor } from './security/auth.interceptor';
import { ClientValidator } from './clients/client/client.validator';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    UserDetailComponent,
    LoginComponent,
    NotFoundComponent,
    ClientsComponent,
    ClientComponent,
    ClientDetailComponent,
    SnackbarComponent,
    InputComponent,
    KzMaskDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [
    LoginService,
    NotificationService,
    ClientsService,
    LoggedInGuard,
    ClientValidator,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

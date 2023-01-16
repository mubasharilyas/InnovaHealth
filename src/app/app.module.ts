import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgToastModule } from 'ng-angular-popup'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ContactsComponent } from './pages/dashboard/contacts/contacts.component';
import { AlertsComponent } from './pages/dashboard/alerts/alerts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    ContactsComponent,
    AlertsComponent,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent, AlertsComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    const el = createCustomElement(AlertsComponent, { injector });
    customElements.define('custom-alett-widget', el);
  }
  ngDoBootstrap() { }
}

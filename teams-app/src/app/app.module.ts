import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MsalModule } from "@azure/msal-angular";
import { BrowserCacheLocation, InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule.forRoot(new PublicClientApplication({
      auth: {
        clientId: 'ff254847-12c7-44cf-921e-8883dbd622a7',
        authority: 'https://login.microsoftonline.com/M365x61791022.onmicrosoft.com',
        redirectUri: 'http://localhost:4200/auth',
      },
      cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage,
        storeAuthStateInCookie: false
      }
    }), {
      interactionType: InteractionType.Redirect,
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([])
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

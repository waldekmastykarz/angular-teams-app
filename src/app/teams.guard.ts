import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { InteractionStatus } from '@azure/msal-browser';
import * as microsoftTeams from "@microsoft/teams-js";
import { filter, firstValueFrom, Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { TeamsService } from './teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsGuard implements CanActivate {
  constructor(private msalService: MsalService,
    private authService: AuthService,
    private router: Router,
    private msalBroadcastService: MsalBroadcastService,
    private teamsService: TeamsService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.teamsService
      .inTeams()
      .then(inTeams => {
        if (inTeams) {
          return new Promise<boolean>((resolve) => {
            microsoftTeams.authentication.getAuthToken({
              successCallback: (token: string) => {
                // const decoded: { [key: string]: any; } = jwtDecode(token) as { [key: string]: any; };
                // setName(decoded!.name);
                microsoftTeams.appInitialization.notifySuccess();
                resolve(true);
              },
              failureCallback: (message: string) => {
                // setError(message);
                microsoftTeams.appInitialization.notifyFailure({
                  reason: microsoftTeams.appInitialization.FailedReason.AuthFailed,
                  message
                });
                resolve(false);
              },
              resources: ['https://244e-2001-1c00-80c-d00-e5da-977c-7c52-5193.ngrok.io']
            });
          });
        }

        return firstValueFrom(this.msalBroadcastService.inProgress$
          .pipe(
            filter((status: InteractionStatus) => status === InteractionStatus.None),
            switchMap(() => {
              if (this.msalService.instance.getAllAccounts().length > 0) {
                return of(true);
              }

              this.authService.redirectUrl = state.url;
              this.router.navigate(['/login']);
              return of(false);
            })
          ))
      });
  }
}

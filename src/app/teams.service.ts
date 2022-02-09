import { Injectable } from '@angular/core';
import * as microsoftTeams from "@microsoft/teams-js";

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  private teamsContext?: microsoftTeams.Context | null;

  constructor() { }

  async getTeamsContext() {
    if (this.teamsContext !== undefined) {
      return this.teamsContext;
    }

    const teamsContext = await Promise.race<microsoftTeams.Context | null>([
      // If we're in Teams, the context will be returned
      new Promise((resolve) => {
        microsoftTeams.initialize(() => {
          microsoftTeams.getContext((context) => {
            resolve(context);
          });
        });
      }),
      // If we're not in Teams, the Teams SDK calls never return.
      // This timeout will resolve the promise and return null.
      new Promise((resolve) => {
        setTimeout(() => resolve(null), 100);
      })
    ]);

    this.teamsContext = teamsContext;
    return teamsContext;
  }

  async inTeams() {
    const teamsContext = await this.getTeamsContext();
    return teamsContext !== null;
  }
}

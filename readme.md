# Teams app built with Angular

Boilerplate Teams app with SSO built using Angular.

Contents:

- **teams-app**: Angular app
- **package**: files for the Teams app package. Package the contents in a .zip file

## Minimal Path to Awesome

- Install prerequisites:
  - CLI for Microsoft 365: `npm i -g @pnp/cli-microsoft365`
- Run commands:
  - Login to CLI for Microsoft 365:
    `m365 login`
  - Create Azure AD app:
    `m365 aad app add --name 'Angular Teams app' --platform spa --redirectUris 'http://localhost/auth' --apisDelegated 'https://graph.microsoft.com/User.Read' --save`

# Teams app built with Angular

Boilerplate Teams app with SSO built using Angular.

Contents:

- **src**: Angular app
- **api**: test API to verify that the Angular app can call APIs secured with AAD
- **package**: files for the Teams app package. Package the **contents** (not the whole folder) in a .zip file

## Minimal Path to Awesome

- Prerequisites:
  - [Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program)

- First time setup:
  1. Login to CLI for Microsoft 365: `npm run m365:login`
  2. Create Azure AD app: `npm run m365:create-aad-app`
  3. Publish app to Teams: `npm run m365:publish`

- First and subsequent runs:
  - Start Angular web server: `npm run start:tunnel`

    This will start a local web server that will serve the app, and create a tunnel to the web server to expose it through a public URL using [localtunnel](https://github.com/localtunnel/localtunnel).

You need a unique URL for the app to be accessible from the web, therefore you should replace the `myuniquedomain` used in the `tunnel` and `update:manifest` scripts with a unique domain in the scripts section of `package.json`.

### Updating your app

If you update the app or public URL, you need to publish your update:

1. In the `package.json`, bump the version number.
2. Update the Teams app: `npm run m365:update`

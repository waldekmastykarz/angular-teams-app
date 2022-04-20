# Angular Teams App Starter

> Boilerplate Teams app with built-in SSO made with Angular.

Features:
- [Azure Active Directory](https://azure.microsoft.com/services/active-directory/?WT.mc_id=javascript-0000-cxa) authentication, compatible with Teams' SSO.
- Automated scripts to create, publish and update your Teams app.
- Local tunnel setup to test your app in Teams using your local dev server (with live reload).

## Getting started 

**Prerequisites:** You need a [Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program?WT.mc_id=javascript-0000-cxa) to publish the Teams app.

1. Clone the repository, and run `npm install`
2. Login to CLI for Microsoft 365: `npm run m365:login`
3. Create the Azure Active Directory (AAD) app: `npm run m365:create-aad-app`
4. Publish app to Teams: `npm run m365:publish`

These steps are only needed the first time.

After publishing your app, you can test it in Teams using your local dev server:
```bash
npm run start:tunnel
```

This will start a local web server that will serve the app, and create a tunnel to the web server to expose it through a public URL using [localtunnel](https://github.com/localtunnel/localtunnel).

> **Note:** You need a unique URL for the app to be accessible from the web, therefore you should replace the `myuniquedomain` used in the `tunnel` and `update:manifest` scripts with a unique domain in the scripts section of `package.json`.

## Project structure

```
api/        Test API to verify that the Angular app can call APIs secured with AAD.
package/    Files for the Teams app package. 
src/        Angular app
scripts/    Scripts to update Teams app IDs and URLs.
```

## Main tasks

Task automation is based on [NPM scripts](https://docs.npmjs.com/misc/scripts).

Tasks                         | Description
------------------------------|---------------------------------------------------------------------------------------
npm start:tunnel              | Run development server on `http://localhost:4200/` and create a public URL to access it
npm run build                 | Build app for production in `dist/` folder
npm test                      | Run unit tests via [Karma](https://karma-runner.github.io) in watch mode
npm run m365:login            | Log in to Microsoft 365 CLI
npm run m365:create-aad-app   | Create Azure Active Directory (AAD) app
npm run m365:package          | Create Teams app zip package
npm run m365:publish          | Publish Teams app to Microsoft 365 (first time only)
npm run m365:update           | Update Teams app in Microsoft 365

## Updating Teams app

If you update the app or public URL, you need to publish an update to your Teams app:

1. In `package.json`, bump the version number. You can also use `npm version patch` to bump the patch version number.
2. Update the Teams app: `npm run m365:update`

## Deploying to production

When you are ready to deploy your app to production, there are two main steps needed to make your app available to the public: first you need to deploy your web app on a server, and then you need to publish the app to your production tenant.

### Step 1: Deploying your web app

1. Build app for production in `dist/` folder using `npm run build`.
2. Deploy the built app to your favorite cloud provider. See [instructions below](#Deploying-Angular-app-to-to-Azure-Static-Web-Apps) for deploying to [Azure Static Web Apps](https://azure.microsoft.com/services/app-service/static/?WT.mc_id=javascript-0000-cxa) for example.

### Step 2: Deploying your Teams app

1. Set your production URL with `node scripts/update-manifest.js <production_url>`
1. Login to CLI for Microsoft 365 onto the production tenant: `npm run m365:login`
1. Create the Azure Active Directory (AAD) app: `npm run m365:create-aad-app`
1. Publish app to Teams: `npm run m365:publish`

## Deploying web app to to Azure Static Web Apps

> What's Azure Static Web Apps? It's an all-inclusive hosting service for web apps providing features like continuous deployment, serverless APIs, authentication and more. And it has a free tier!

Prerequisites:
- A [GitHub account](https://github.com/join)
- An [Azure account](https://azure.microsoft.com/free/?WT.mc_id=javascript-0000-cxa) (you can reuse your GitHub account to login)

1. Click on this button to open the Azure portal:<br> [![Deploy to Azure button](https://aka.ms/deploytoazurebutton)](https://portal.azure.com/?feature.customportal=false&WT.mc_id=javascript-0000-cxa#create/Microsoft.StaticApp)
2. Fill in the details (you don't need to change what's not mentioned):
  - **Resource Group:** Select **Create new** and type in `angular-teams-app`
  - **Name:** Type in `angular-teams-app`
  - Select **Sign in with GitHub**, and pick the **Organization**, **Repository** and **Branch** for the repo with the app you want to deploy.
3. Select **Review + Create**, then **Create**.

Wait a few seconds for everything to be set up, and click on **Go to resource**. From there, you'll be able to see the new public URL that was created for your app in the **URL** field.

This is what you'll use for your production URL. After a few minutes, your Teams app will be available at this URL.

You can find more tutorials on using Static Web Apps [here](https://docs.microsoft.com/learn/paths/azure-static-web-apps/?WT.mc_id=javascript-0000-cxa).

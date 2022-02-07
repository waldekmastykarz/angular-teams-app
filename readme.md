# Teams app built with Angular

Boilerplate Teams app with SSO built using Angular.

Contents:

- **teams-app**: Angular app
- **package**: files for the Teams app package. Package the **contents** (not the whole folder) in a .zip file

## Minimal Path to Awesome

- Prerequisites:
  - [Microsoft 365 developer tenant](https://developer.microsoft.com/microsoft-365/dev-program)
  - CLI for Microsoft 365: `npm i -g @pnp/cli-microsoft365`
  - [ngrok](https://ngrok.com/)
- First time only:
  - Login to CLI for Microsoft 365:
    `m365 login`
  - Create Azure AD app:
    `m365 aad app add --manifest @aad-app-manifest.json --save`
  - Create Teams package .zip file
    `zip -j angular-teams.zip package/*`
  - Publish app to Teams
    `m365 teams app publish -p angular-teams.zip`
- First and subsequent runs:
  - Start Angular web server:

    ```sh
    cd teams-app
    ng serve
    ```

  - Start ngrok:
    `ngrok http 4200 -host-header="localhost:4200"`
    **Note the ngrok tunnel URL**
  - In the `aad-app-manifest.json` file update:
    - identifierUris to reflect the ngrok URL
    - reply URL to reflect the ngrok URL  
  - In the `package/manifest.json` file update:
    - the `version` property so that you can update the Teams app with new URLs
    - the `webApplicationInfo.id` property to reference the newly created Azure AD app
    - the `webApplicationInfo.resource` property to match the ngrok URL
  - Update Teams package .zip file
    `zip -j angular-teams.zip package/*`
  - Update the Teams app

    ```sh
    appId=$(m365 teams app list --query "[?externalId == '933b8170-ad4c-421f-b2ca-a80f2685ef08'] | [0].id")
    m365 teams app update -i $appId -p angular-teams.zip
    ```

// - Update Teams package .zip file
// `zip -j angular-teams.zip package/*`
// - Update the Teams app

// ```sh
// appId=$(m365 teams app list --query "[?externalId == '933b8170-ad4c-421f-b2ca-a80f2685ef08'] | [0].id")
// m365 teams app update -i $appId -p angular-teams.zip
// ```

// ---------------------------------------------------------------------------
// Update manifests files with new appId and public domain.
// ---------------------------------------------------------------------------

import path from 'path';
import fs from 'fs';
import pkg from '../package.json';

const aadManifestPath = path.join(__dirname, '../aad-app-manifest.json');
const manifestPath = path.join(__dirname, '../package/manifest.json');
const m365rcPath = path.join(__dirname, '../.m365rc');
const usage = `Usage: node ${process.argv[1]} <public_domain>`;

run();

// ---------------------------------------------------------------------------

function run() {
  const args = process.argv.slice(2);

  if (args.length !== 0 || (!args[0] && !process.env.PUBLIC_DOMAIN)) {
    console.error(usage);
    process.exit(-1);
  }

  const publicDomain = args[0] || process.env.PUBLIC_DOMAIN;
  updateManifests(publicDomain);
}

function updateManifests(publicDomain) {
  const appId = getAppId(); 
  updateManifest(appId, publicDomain);
  updateAadManifest(publicDomain);
  console.log('Done!');
}

function updateAadManifest(appId, publicDomain) {
  console.log(`Updating ${path.basename(aadManifestPath)}...`);
  const aadManifestContents = fs.readFileSync(aadManifestPath, 'utf8');
  if (!aadManifestContents) {
    throw new Error(`Unable to read file: ${aadManifestPath}`);
  }

  const aadManifest = JSON.parse(aadManifestContents);
  aadManifest.appId = appId;
  aadManifest.identifierUris = [`api://${publicDomain}/${appId}`];
  aadManifest.replyUrls[1].url = `https://${publicDomain}/auth`;

  fs.writeFileSync(aadManifestPath, JSON.stringify(aadManifest, null, 2));
}

function updateManifest(appId, publicDomain) {
  console.log(`Updating ${path.basename(manifestPath)}...`);
  const manifestContents = fs.readFileSync(manifestPath, 'utf8');
  if (!manifestContents) {
    throw new Error(`Unable to read file: ${manifestPath}`);
  }

  const manifest = JSON.parse(manifestContents);

  manifest.version = pkg.version;
  manifest.webApplicationInfo.id = appId;
  manifest.webApplicationInfo.resource = `api://${publicDomain}/${appId}`;
  manifest.staticTabs[0].contentUrl = `https://${publicDomain}/`;

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

function getAppId() {
  const m365rcContents = fs.readFileSync(m365rcPath, 'utf8');
  if (!m365rcContents) {
    throw new Error(`Unable to read file: ${m365rcPath}`);
  }

  const rc = JSON.parse(m365rcContents);
  return rc.apps[0].id;
}

const express = require('express');
const http = require('http');
const cors = require('cors');
const passport = require('passport');
const BearerStrategy = require('passport-azure-ad').BearerStrategy;

const port = 4201;

const app = express();
app.set('port', port);

app.use(cors());
app.use(passport.initialize());
const options = {
  identityMetadata: `https://login.microsoftonline.com/M365x61791022.onmicrosoft.com/v2.0/.well-known/openid-configuration`,
  clientID: 'ff254847-12c7-44cf-921e-8883dbd622a7',
  audience: [
    // web app
    'ff254847-12c7-44cf-921e-8883dbd622a7',
    // teams
    'api://myuniquedomain.loca.lt/ff254847-12c7-44cf-921e-8883dbd622a7'
  ],
  validateIssuer: true,
  issuer: [
    // teams
    'https://sts.windows.net/ace48f4b-e7d9-4922-9d13-79b3d2c32fdd/'
  ],
  loggingLevel: 'info'
}
const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
}
);
passport.use(bearerStrategy);

app.get('/api/orders',
  passport.authenticate('oauth-bearer', { session: false }),
  (req, res) => {
    res.json([{ id: 1, name: "Order 1" }, { id: 2, name: "Order 2" }]);
  });

http.createServer(app).listen(port, () => {
  console.log(`Server running on ${port}`);
});
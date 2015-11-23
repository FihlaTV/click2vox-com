# Voxbone
## Create a click to call button from a widget generator

### Pre-Requisites

* [NodeJS](https://nodejs.org)
* [MongoDB](https://nodejs.org)

### Mailing

* [SendGrid](sendgrid.com)

### Environment Variables

* APP_URL
* FORCE_HTTPS
* SECRET_KEY (Defaults to 'xXxXxXxXxX')
* MONGOLAB_URI (Defaults to 'mongodb://localhost/voxboneDB')
* SENDGRID_USERNAME
* SENDGRID_PASSWORD
* SENDGRID_FROM
* VOXBONE_WEBRTC_USERNAME
* VOXBONE_WEBRTC_PASSWORD
* VOXBONE_API_USERNAME
* VOXBONE_API_PASSWORD
* GOOGLE_ANALYTICS_ID
* BYPASS_PRE_EXISTING_ACCOUNTS_CHECK (WARNING: Use Carefully! )
* NEW_RELIC_LICENSE_KEY

### To Run locally

#### To install dependencies
```
npm install
```

#### To start the server
```
npm start
```

### Heroku Environment

* TBD

### Resources

* ExpressJS (http://expressjs.com/)
* Using clipboard without Flash, [Clipboard.js](https://zenorocha.github.io/clipboard.js/)

# Voxbone
Create a click to call button from a widget generator

### Pre-Requisites

* [NodeJS](https://nodejs.org)
* [MongoDB](https://www.mongodb.org/)

### Mailing

* [SendGrid](sendgrid.com)

### Environment Variables

* `APP_URL`
* `CDN_URL`
* `FORCE_HTTPS`
* `SECRET_KEY` (Defaults to 'xXxXxXxXxX')
* `MONGOLAB_URI` (Defaults to 'mongodb://localhost/voxboneDB')
* `SENDGRID_USERNAME`
* `SENDGRID_PASSWORD`
* `SENDGRID_FROM`
* `SENDGRID_PASSWORD_RESET_TEMPLATE`
* `SENDGRID_PASSWORD_CHANGED_TEMPLATE`
* `SENDGRID_VERIFY_ACCOUNT_TEMPLATE`
* `VOXBONE_WEBRTC_USERNAME`
* `VOXBONE_WEBRTC_PASSWORD`
* `VOXBONE_API_USERNAME`
* `VOXBONE_API_PASSWORD`
* `GOOGLE_ANALYTICS_ID`
* `HOTJAR_ID`
* `NEW_RELIC_LICENSE_KEY`
* `TIMEOUT` (in miliseconds, defaults to '12000' )
* `DEFAULT_BUTTON_LABEL` The text to be used by default (Call Sales) when creating buttons
* `GOOGLE_RECAPTCHA_SITE_KEY`
* `GOOGLE_RECAPTCHA_SECRET_KEY`
* `DEFAULT_SIP_URIS` (Array flavoured i.e. 'echo@ivrs,digits@ivrs,test@test.voxbone.com')
* `DEMO_USER_EMAIL` (default: 'demo.widget@click2vox.com') The email that is going to be used to create the user for demo widget.
* `DEMO_SIP_URI` (default: 'echo@ivrs')
* `HONEYBADGER_API_KEY`
* `HONEYBADGER_ENVIRONMENT` This is used to differentiate the environment of the error in honeybadger dashboard
* `GITHUB_OAUTH2_KEY`
* `GITHUB_OAUTH2_SECRET_KEY`
* `GOOGLE_OAUTH2_KEY`
* `GOOGLE_OAUTH2_SECRET_KEY`
* `LINKEDIN_OAUTH2_KEY`
* `LINKEDIN_OAUTH2_SECRET_KEY`
* `WINDOWSLIVE_OAUTH2_KEY`
* `WINDOWSLIVE_OAUTH2_SECRET_KEY`
* `VOXBONE_OAUTH2_AUTH_URL`
* `VOXBONE_OAUTH2_TOKEN_URL`
* `VOXBONE_OAUTH2_PROFILE_URL`
* `VOXBONE_OAUTH2_KEY`
* `VOXBONE_OAUTH2_SECRET_KEY`

### To Run locally

#### Dev dependencies

* [Bower](http://bower.io/)
* [RequireJS](http://requirejs.org/)
* [Grunt](http://gruntjs.com/)

#### Install app dependencies
```bash
npm install
bower install
```

#### To start the server
```
npm start
```

#### Extra dev commands
- To compile .less to .css
```
grunt less
```

- To watch changes on .less files and automatically compile them
```
grunt watch
```

- Alternatively to run the local server. This will restart the server when there are new changes in the code and
also it will watch for changes in the .less files and will compile them automatically to css

```
grunt
```

### Mongo Tasks

- To Import the accounts
```bash
mongoimport -h $HOST:$PORT -d $DB_NAME -c accounts -u $DB_USER -p $DB_PASSWORD --file accounts.json
```

- To Connect to the Mongo Database
```bash
mongo $HOST:$PORT/$DB_NAME -u $DB_USER -p $DB_PASSWORD
```

### Tests Running

* NightWatch (http://nightwatchjs.org/)

- To run the tests first serve the app with `grunt` and in another window run:
```bash
grunt nightwatch
```
make sure to have all you environment variables loaded before running `nightwatch`

* Mocha (https://mochajs.org/)

- We have taken the BDD approach (using expect). Use `npm test` command (`grunt simplemocha` alternatively) to run the tests.

### Resources

* ExpressJS (http://expressjs.com/)
* Using clipboard without Flash, [Clipboard.js](https://zenorocha.github.io/clipboard.js/)

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
* BYPASS_PRE_EXISTING_ACCOUNTS_CHECK (WARNING: Use Carefully! it is NOT the idea to use it in production )
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

### Mongo Tasks

* To Import the accounts
```
mongoimport -h $HOST:$PORT -d $DB_NAME -c accounts -u $DB_USER -p $DB_PASSWORD --file accounts.json
```

* To Connect to the Mongo Database
```
mongo $HOST:$PORT/$DB_NAME -u $DB_USER -p $DB_PASSWORD
```

### Resources

* ExpressJS (http://expressjs.com/)
* Using clipboard without Flash, [Clipboard.js](https://zenorocha.github.io/clipboard.js/)

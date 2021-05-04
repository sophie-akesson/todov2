# To do v2

A basic to do list using. This was made for the second assignment in the course Dynamic web development at Medieinstitutet.

## Demo
https://sleepy-springs-69145.herokuapp.com/
NOTE: Slow load due to being on a free dyno. Also Facebook Login will not work in the demo because the app has not been put up for review by Facebook.
NOTE2: Feel free to contact me if you wish to have your user removed.

## Credit
Big thanks to [rmRadev at Deviantart](https://www.deviantart.com/rmradev) for the background image.

## Functionality

- User registration
- Forgot/reset password functionality
- Login using Facebook
- Uses pagination to load 5 to dos at a time
- Uses Mongo Atlas to store to dos
- Possibility to add new to dos
- Possibility to star to dos
- Remove to dos by clicking the cross icon
- Complete to dos by checking them
- Display all incomplete to dos, starred to dos, to dos due this week and completed to dos
- Basic error handling

## Dependencies

- bcrypt
- dotenv
- ejs
- express
- jsonwebtoken
- luxon
- mongoose
- node-fetch
- node-sass
- node-sass-middleware
- nodemailer

##  Install

Clone the repo and install the dependencies using the following steps:

1. Clone the repo using Git.
```
git clone https://github.com/sophie-akesson/todov2.git
```

2. Install dependencies using npm.
```
npm i
```

## Set up .env and self-signed SSL certificate
A few things needs to be in place before you can run the app in localhost:

1. The following information must be filled in an `.env` file. Replace `{ info }` with your own information:
```
DB_CONNECTION={ info }
PORT={ info }
JWT_KEY={ info }
MAILSERVICE_HOST="{ info }"
MAILSERVICE_PORT="{ info }"
MAILSERVICE_USER="{ info }"
MAILSERVICE_PW="{ info }"
FACEBOOK_ID={ info }
FACEBOOK_SECRET_KEY={ info }
FACEBOOK_STATE={ info }
```

2. This app runs in SSL mode only and needs a self-signed certificate in order to run properly. Use this [guide.](https://flaviocopes.com/express-https-self-signed-certificate/ "https://flaviocopes.com/")

## Folder struture

```
├── controllers
├── middleware
├── models
├── node_modules
│   └── <package name>
├── public
│   └── images
│   └── style
├── routes
├── scss
├── views
.env
.gitignore
app.js
package.json
README.md
server.cert
server.key
```

## Naming conventions

The project uses camelCase for variables, function names and HTML ids and classes. PascalCase is used for Javascript class names.

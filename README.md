# apiko-nestjs

The apiko-nestjs is an example of the REST-API server for the eCommerce application. It was created by the Nestjs framework. It is the backend part of the fullstack app. Data stored SQL database: PostgreSQL: [postgres](https://www.heroku.com/postgres)

## Quick start

# Step 1. Clone the repo

```bash
git clone git@github.com:konstantindergachev/apiko-nestjs.git
```

# Step 2. Install dependencies

```bash
npm install or yarn install
```

# Step 3. To hosting images I use the Cloudinary

[cloudinary](https://cloudinary.com/)

# Step 4. Save your config variables into .env file (see .env.example)

```sh
PORT=<local api server port>

POSTGRES_HOST=<postgresql host>
POSTGRES_PORT=<postgresql port>
POSTGRES_USER=<user name>
POSTGRES_PASSWORD=<user password>
POSTGRES_DB=<database name>

SECRET_STRING=<jwt secret string>

```

# Step 5. Start the server in the development mode in the nodemon mode

```bash
 npm run start:dev or yarn start:dev
```

## The frontend part of this app is here: [apiko-frontend](https://github.com/konstantindergachev/apiko-frontend)

Author:
Konstantin Dergachev [portfolio](http://dergachevkonstantin.surge.sh/).

# Storefront Backend Project

The Udacity Storefront Backend Project completed by Stephen Wright.

# Files
## Environment Variables
For this project, the environment variables are placed here to be copied to an .env file.
```.env
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront_backend
POSTGRES_TEST_DB=storefront_backend_test
POSTGRES_USER=storefront_user
POSTGRES_PASSWORD=storefront_pssw0rd
ENV=dev
BCRYPT_PASSWORD=b@knd-frnTs0R3
SALT_ROUNDS=10
TOKEN_SECRET=th1zlzaT0k3Ns3KrEt!
EXAMPLE_TEST_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwiZmlyc3RfbmFtZSI6IlRlc3QiLCJsYXN0X25hbWUiOiJVc2VyIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDdYSXpaY1paQUtFdnd5ZDhodUI4VU9PcHptOGFmeXZVZHhiYWJBTFBvLnZyaGdQQXlaUjZpIn0sImlhdCI6MTY3NTA0MDQ0MH0.FVPQelPdf5nYBC2YluEA90SLBoZnnyvXENycAdhgDAo
```

## database.json
For this project, the database variables are placed here to be copied to a database.json file.
```json
{
    "dev": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "storefront_backend",
      "user": "storefront_user",
      "password": "storefront_pssw0rd"
    },
    "test": {
      "driver": "pg",
      "host": "127.0.0.1",
      "database": "storefront_backend_test",
      "user": "storefront_user",
      "password": "storefront_pssw0rd"
    }
}
```

# Setup
- Firstly, create the .env and database.json files and copy their above contents from this README.md to those files.

## Database
### Startup
- The database is run via a docker container. To startup the database, in the terminal type:
```
docker compose up
```
- This will automatically create the developer database.
- The database will start on port 5432.

### Test Database
- To create the test database, start up the docker container, then:
```
psql -h 127.0.0.1 --username storefront_user storefront_backend
CREATE DATABASE storefront_backend_test
```
### Migrations
- When running the test command (see below), database migrations will automatically happen. If running on the development database, you can run the migration scrips via:
```
db-migrate up
```

## Packages
- All packages shall install by typing:
```
npm install
```

## Start up
- To start the server up:
```
yarn watch
```
- The server will start on port 3000.

## Tests
- To run the Jasmine tests:
```
yarn test
```

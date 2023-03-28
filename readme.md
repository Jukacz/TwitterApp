# Twitter App
Tomasz Ogrodnik, Kacper Śmielak, Adam Blady
## About
A site through which you will be able to manage various things. In version one, we are implementing the ability to send downloads for approval.

## First installation
1. Clone the repository
2. Go to project directory
3. Run commands:
   1. `docker pull python:3.10-buster`
   2. `docker pull node:16.18-buster`
   3. `cd frontend`
   4. `npm install`
   5. `cd ..`
   6. `docker compose up`

And that should run the site. You can access it at `localhost:3000`.

## Starting the site
1. Go to project directory
2. Run command `docker compose up`

## Stopping the site
1. Go to project directory
2. Run command `docker compose down`

## If error occurs
1. Go to project directory
2. Run commands:
   1. `docker compose down`
   2. `docker image rm twitter-frontend`
   3. `docker image rm twitter-backend`
3. `docker compose up`


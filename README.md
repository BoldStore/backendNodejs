# Connect

A platform to change the way we sell things on the internet
<br>This repository uses the `yarn` package manager.

## Setup

```
yarn install
```

To install the required dependencies

```
yarn dev
```

To run the app in a dev environment. By default, it runs on the `PORT 3000`.

```
yarn build
```

To create an optimized production build in the dist directory.

## Technology

- This project is coded using `Typescript` for type safe and scalable programming.
- The code in written in `express` in `NodeJS` since it's more scalable as compared to Django or other frameworks.
- Uses `yarn` as the package manager.
- Uses `JWT` for authentication as it's the industry standard
- `MongoDB` is being used as a persistant database
- `mongoose` is being used to connect to MongoDB due to it's popularity, community and scalability.

## Folder Structure

All the code for the project is in the `src` folder.
The folder is divided into:

1. <b>Models</b>
   <br>Contains the mongoose models, or schemas that are used throughout the code
2. <b>Controllers</b>
   <br>All the actual logic of each route is handled here
3. <b>Routes</b>
   <br>Defines all the routes which would be hit by the frontend

## Authentication

The authentication follows the industry standard JWT Authentication.

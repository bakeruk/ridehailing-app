<h1 align="center">Ridehailing SPA</h1>
<p align="center">Ridehailing single-page app, Typescript monorepo using NextJS and NestJS.</p>
<p align="center">
  <img src="https://img.shields.io/github/license/bakeruk/ridehailing-app" alt="License" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [Run using Docker](#run-using-docker)
- [Development](#development)
  - [API (NestJS)](#api-nestjs)
    - [Testing](#testing)
  - [App (NextJS)](#app-nextjs)
    - [Testing](#testing-1)
- [Next steps](#next-steps)

## Introduction

This project was built with **Typescript** implementations of **NestJS** and **NextJS**, using:

  - **NodeJS v16.13.2 (LTS)**
  - **Yarn v1.22.15**
  - **NPM v6.14.15**

It was developed as a monorepo for the ease of sharing code and for its Typescript visibility across the individual projects.

An interactive map that shows you nearby taxis to your nearest Splyt office.

## Run using Docker

Before we begin, let's setup the environment variables required by the codebase. You will need to duplicate the `ridehailing-app/docker.env.EXAMPLE` file and name the new version to `docker.env` (the file will be moved and renamed to `.env.production` within Docker - NextJS build-time work around).


```sh
# Environment specific
ENVIRONMENT="production"

# NextJS
NEXT_PUBLIC_API_BASE_URL="http://api-gateway:4000"
NEXT_PUBLIC_MAPBOX_TOKEN="CHANGEME"

# Microservices
API_GATEWAY_PORT=4000
SPLYT_TAXIS_MICROSERVICE_PORT=4010
SPLYT_TAXIS_MICROSERVICE_URL="http://api-splyt-taxis:4010"

# Splyt API - Include /api path (https://example.com/api)
SPLYT_API_URL="CHANGEME"
```

You will need to supply a [**Mapbox**](https://www.mapbox.com/) API token for the `NEXT_PUBLIC_MAPBOX_TOKEN` variable and the `SPLYT_API_URL`.

Now we can build our prodject images and run them in containers using,

```sh
docker-compose up
```

**Note**: Ensure your Docker client is running.

Next, grab a coffee and enjoy! ☕️

## Development

Firstly, we need to make sure that all of the dependencies are installed using `Yarn`.

```shell
yarn install
```

For this next step, it is recommended that you use multiple **Terminal** tabs.

Below gives you an overview of the project structure.

```
|--api                # NestJS (NodeJs API)
|  |--libs            # Common libraries
|  |  |--splyt-api    # Splyt API library
|  `--packages
|     |--api-gateway  # Mock API gateway
|     `--splyt-taxis  # splyt taxis API microservice
`--app                # NestJS app
   |--public
   `--src
      |--api          # External API routes
      |--components   # Shared components
      |  |--common    # Common (shared) components
      |  `--home      # Home page specific components
      |--hooks        # Shared hooks
      |--pages
      |--types        # Global declaration types
      `--utils
         |--helpers   # Utility helpers
         `--theme     # Theme definitions
```

### API (NestJS)

The backend API uses [NestJS](https://nestjs.com/) for its building efficiency, structure and pre-built plugins. It fully supports Typescript and uses OOP (Object Orientated Programming) as a standard practice.

Before we begin, let's setup the environment variables required by the codebase. You will need to duplicate the `ridehailing-app/app/.env.EXAMPLE` file and name the new version to `.env`.

```sh
# Environment specific
ENVIRONMENT="development"

# Microservices
API_GATEWAY_PORT=4000
SPLYT_TAXIS_MICROSERVICE_PORT=4010
SPLYT_TAXIS_MICROSERVICE_URL="http://localhost:4010"

# Splyt API
SPLYT_API_URL="https://example.com/api" # include the API base path https://example.com/api
```

Once the environment variables have been configured, now you will need to start the **API Gateway** and **Splyt Taxis microservice** NestJS instances within the `ridehailing-app/api/` directory.

```sh
cd ridehailing-app/api/
yarn start api-gateway

# New tab
yarn start splyt-taxis
```

#### Testing

Tests can be run from the `ridehailing-app/api/` directory. Running the following command will run all the integration tests for each service,


```sh
yarn test
```

### App (NextJS)

The frontend app uses [**NextJS**](https://nextjs.org/) for its progressive ability to develop **React** based apps with ease, while harnessing the power of Static Site Generation (SSG) and Server-side Rendering (SSR) abilities.

Before we begin, let's setup the environment variables required by the codebase. You will need to duplicate the `/ridehailing-app/app/.env.EXAMPLE` file and name the new version to `.env.local`.

```sh
# APIs
NEXT_PUBLIC_API_BASE_URL="http://localhost:4000"
NEXT_PUBLIC_MAPBOX_TOKEN="CHANGEME"
```

You will need to supply a [**Mapbox**](https://www.mapbox.com/) API token for the `NEXT_PUBLIC_MAPBOX_TOKEN` variable.

Once the environment variables are configured, you can now run `yarn dev` to start the NextJS project,

```sh
yarn dev
```

#### Testing

Tests can be run from the `ridehailing-app/app/` directory. Running the following command will run all the integration tests using Cypress,


```sh
yarn cy:run
# Or you can manually trigger the tests using the Cypress test GUI
yarn cy:open
```

## Next steps

  - CI/CD
  - Further Yarn workspace commands to improve development UX
  - In depth End-to-end (e2e) tests
  - Improve the security of the backend API based on its run-time environment. For example:

    - CORS.
    - HTTP response security.
      - Headers.
      - SSL.
    - Rate limiting.
    - etc.

  - Add Swagger openapi decorators to automatically generate API documentation.
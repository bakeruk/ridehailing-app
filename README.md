<h1 align="center">Ridehailing SPA</h1>
<p align="center">Ridehailing single-page app, Typescript monorepo using NextJS and NestJS.</p>
<p align="center">
  <img src="https://img.shields.io/github/license/bakeruk/ridehailing-app" alt="License" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Running the project](#running-the-project)
  - [Yarn](#yarn)
    - [API (NestJS)](#api-nestjs)
    - [App (NextJS)](#app-nextjs)
- [Project structure](#project-structure)

## Running the project

### Yarn

To run the project, we need to make sure that all of the dependencies are installed using `Yarn`.

```shell
yarn install
```

**Note**: For this next step, it is recommended that you use multiple **Terminal** tabs.

#### API (NestJS)

You will need to start the **API Gateway** and **Splyt Taxis microservice** NestJS instances within the `ridehailing-app/api` directory.

```sh
cd ridehailing-app/api/
yarn start api-gateway

# New tab
yarn start splyt-taxis
```

#### App (NextJS)

TODO


## Project structure

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
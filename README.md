<h1 align="center">Ridehailing SPA</h1>
<p align="center">Ridehailing single-page app, Typescript monorepo using NextJS and NestJS.</p>
<p align="center">
  <img src="https://img.shields.io/github/license/bakeruk/ridehailing-app" alt="License" />
</p>
<br />

## Table of Contents
- [Table of Contents](#table-of-contents)
- [Project structure](#project-structure)

## Project structure

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
      `--utils        # utilities
         `--theme

```
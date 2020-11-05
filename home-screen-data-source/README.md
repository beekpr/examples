# Home Screen Data Source

A boilerplate Express service making use of JWT to provide data to a Home Screen widget. This README shows only one part of widget development. Please take a look at our [Developer Portal](https://developers.beekeeper.io/v2/welcome/home-screen).

## Get Started

To install dependencies run: 

```sh
yarn install
```

then, we need to compile the TypeScript with: 

```sh
yarn run compile
```

You can start the service by:

```sh
yarn start
```

## Usage

Whenever a widget makes an authenticated request to this service, you will have the information of the JWT on ``req.auth`` available. The ``sub`` and ``tenantuserid`` should be key for you. Those parameters identify the current user on the Beekeeper Platform.

Based on the information from the JWT, you can serve personalized data for each user individually. 

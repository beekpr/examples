# Summary

This is a very simple node js application showcasing how you can build a service which consumes a JSON Web Token which Beekeeper generates. More about JSON Web Tokens can be found under https://jwt.io/

This microservice is based on `node` and the `express-jwt` library. The microservice simply prints out the name of the user and the groups he/she belongs to.

# How to run

1. You will need nodejs and npm installed. To install these, please see https://nodejs.org/en/download/package-manager/. Please follow the instructions for your system.
2. Acquire your public key and replace beekeeper_jwt.pem with your public key. Please contact customer_success@beekeper.io for your public key and the beekeeper setup
3. Run `npm install`. This will install all the required dependencies
4. Run `npm start`.

The application is now running under port 3000.

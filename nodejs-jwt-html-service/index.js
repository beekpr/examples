'use strict';

const express = require('express')
const jwt = require('express-jwt');
const fs = require('fs');
const app = express()

// Read in the Beekeeper Public Key. This is 
// important, so that we can verify the authenticity
// of the JWT. Otherwise anybody could just create
// a JWT and we would trust them blindly.
//
// NOTE: This public key is from my test environment
// Please contact customer success to receive a 
// public key for your environment. It will not work 
// like this.
const publicKey = fs.readFileSync('beekeeper_jwt.pem');

app.get('/',
        jwt({
          // The public key
          secret: publicKey,
          // The token. We decided to put it as a url parameter
          // under token. This can be configured to be any parameter
          getToken: req => req.query.token
        }),
        function (req, res) {

          // Since we used jwt, we now have access to req.user
          // This is set by the jwt library
          let user = req.user;

          // The JWT token contains a beekeeper_user field.
          let beekeeper_user = user.beekeeper_user;
          // Get all the group ids. See example JWT
          let group_ids = user.beekeeper_user.perms.groups.map((p) => p.id);

          // Here you can render any kind of HTML.
          // You should use most likely a templating engine
          res.send(
`<html>
<body>
Hello ${beekeeper_user.name}

You are part of the following groups: ${group_ids}
</body>
</html>`
          )
        });

app.listen(3000, function () {
  console.log('Example App provided by Beekeeper to showcase how JWT can be used. The application is listening on port 3000')
})


// Example JWT:

// {
//   "beekeeper_version": "1.0",
//   "beekeeper_user": {
//     "perms": {
//       "streams": [ // defines streams to which the user has access to
//         {
//           "perms": [
//             "a", // admin permission
//             "ca", // community admin permission
//             "r", // read permission
//             "w" // write permission
//           ],
//           "id": 1 // id of the stream
//         },
//         {
//           "perms": [
//             "a",
//             "ca",
//             "r",
//             "w"
//           ],
//           "id": 2
//         },
//         {
//           "perms": [
//             "a",
//             "ca",
//             "r",
//             "w"
//           ],
//           "id": 475
//         },
//         {
//           "perms": [
//             "a",
//             "ca",
//             "r",
//             "w"
//           ],
//           "id": 476
//         }
//       ],
//       "role": "admin", // general role, either admin, moderator (deprecated) or user
//       "groups": [ // degines the groups the user is in
//         {
//           "perms": [
//             "ga" // Group admin
//           ],
//           "id": 179
//         },
//         {
//           "perms": [
//             "m" // regular member
//           ],
//           "id": 180 // id of group
//         }
//       ]
//     },
//     "name": "Jason Brownbridge", // display name of the user
//     "avatar": "https://dz343oy86h947.cloudfront.net/default/m4_normal.png" // avatar of the user
//   },
//   "iss": "Beekeeper AG",
//   "jti": "e5b5dc91-ccdd-4ee2-bcfe-9ddd9569d1cb",
//   "exp": 1477657884,
//   "iat": 1477485084,
//   "nbf": 1477485084,
//   "sub": "6e6e1a47-c346-4809-ba30-b328ef44d7ac"
// }

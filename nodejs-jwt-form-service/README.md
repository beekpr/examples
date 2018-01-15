# Summary

This is a very simple node js application showcasing how you can build a service which consumes a JSON Web Token which Beekeeper generates and use that information in forms.

# How to run
The system needs access to AWS SES to send out success emails
configure the environment with the following parameters:

- `AWS_ACCESS_KEY_ID`: the access key to use
- `AWS_SECRET_ACCESS_KEY`: the secret key to use
- `AWS_REGION`: the region to use
- `BEEKEEPER_JWT_PUBLIC_KEY`: a beekeeper public key to verify the authenticity of information sent to the service

# Customization
Forms can easily be built, by placing more json files into the `former/forms` directory and modifiying them.

# Serverless Chatbot

This is an example project that shows how to create a serverless chatbot that interacts with Beekeeper users and is triggered by `CHATS.MESSAGE.CREATED` webhook event. It's a simple ping-pong bot that repeats everything you say.

## Prerequisites 
1. Make sure you have Node.js installed on your machine.
2. Follow [the instructions](https://serverless.com/framework/docs/providers/aws/guide/installation/) to install the Serverless framework.
3. Install [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) and [configure the credentials](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html).
4. You need access to Beekeeper tenant and a bot account. Instructions on how to create a bot account can be found [here](https://adminhelp.beekeeper.io/hc/en-us/articles/360002574420-Creating-Bot-Accounts).

## Deploying
1. Clone this repo (`git clone https://github.com/beekpr/examples.git`) and go into `serverless-chatbot` directory.
2. Copy `config.yml.sample` file as `config.yml` and fill in Beekeeper tenant URL and API bot token.
3. Install the required dependencies by running
    ``` bash
    $ npm install
    ```
    in your terminal.
4. Run
    ``` bash
    $ serverless deploy
    ```
    to deploy function.
5. The terminal output should look something like this:
    ```
    (...)
    Service Information
    service: serverless-chatbot
    stage: dev
    region: us-east-1
    stack: serverless-chatbot-dev
    resources: 11
    api keys:
     None
    endpoints:
     POST - https://someurl.execute-api.us-east-1.amazonaws.com/dev/message-received
    functions:
     messageReceived: serverless-chatbot-dev-messageReceived
    (...)
    ```
6. Copy the trigger URL (`https://someurl.execute-api.us-east-1.amazonaws.com/dev/message-received`) and use it to register a webhook. You can
    * call our API [POST /webhooks](https://developers.beekeeper.io/v2/webhooks/register-a-new-webhook) endpoint manually using your bot's API token
    * use the script provided in this repo for your convenience:
   ```
    npm install
    npm run create-webhook 'https://someurl.execute-api.us-east-1.amazonaws.com/dev/message-received'
   ```
7. Check if it works! Try writing a message to the bot and see if it responds. You can also visit
[AWS Lambda Management Console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions) to see your function logs.

## See also
* [Beekeeper Developer Portal](https://developers.beekeeper.io/)
* [Getting started with Beekeeper webhooks](https://developers.beekeeper.io/v2/welcome/webhooks)
* [Beekeeper webhooks API docs](https://developers.beekeeper.io/v2/webhooks/list-all-registered-webhooks)

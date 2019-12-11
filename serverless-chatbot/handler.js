const { SDK } = require('beekeeper');
const { MessageTypes, toMessage } = require('beekeeper/dist/model/message');

const credentials = {
    tenantURL: process.env.BEEKEEPER_TENANT_URL,
    token: process.env.BEEKEEPER_API_TOKEN,
};

const sdk = new SDK(credentials);

const messageReceived = event => {
    const notification = JSON.parse(event.body);
    const { payload: { message: { conversation_id, text } } } = notification;
    console.log("Received message: " + text)

    const message = toMessage({
        message_type: MessageTypes.REGULAR,
        conversation_id,
        text: `You said: ${text}`
    });

    return sdk.Messages.create(message)
        .then(() => {
            console.log("Message sent successfully.", message);
            return { statusCode: 200 };
        })
        .catch((ex) => {
            console.error(ex);
            return { statusCode: 500 };
        });
};

module.exports = {
    messageReceived,
}

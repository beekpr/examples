const { SDK } = require('beekeeper');
const { MessageTypes, toMessage } = require('beekeeper/dist/model/message');

const credentials = {
    tenantURL: process.env.BEEKEEPER_TENANT_URL,
    token: process.env.BEEKEEPER_API_TOKEN,
};

const sdk = new SDK(credentials);

const sendMessage = message => {
    const { conversation_id, text } = message;
    console.log("Received message: " + text)

    const response = toMessage({
        message_type: MessageTypes.REGULAR,
        conversation_id,
        text: `You said: ${text}`
    });

    return sdk.Messages.create(response);
};

const handleMessageReceived = async event => {
    const notification = JSON.parse(event.body);
    const { payload: { message } } = notification;
    try {
        if (message.message_type === MessageTypes.REGULAR && message.text) {
            const response = await sendMessage(message);
            console.log("Response sent successfully.", response);
        } else {
            console.log("Not a text message. Ignoring.")
        }
    } catch(ex) {
        console.error(ex);
        return { statusCode: 500 };
    }
    return { statusCode: 200 };
};

module.exports = {
    handleMessageReceived,
}

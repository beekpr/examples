const YAML = require('yaml')
var fs = require("fs");
const fetch = require('node-fetch');

const configFile = fs.readFileSync('config.yml', 'utf8');
const config = YAML.parse(configFile);
const { tenantUrl, apiToken } = config;

const callbackUrl = process.argv[2];

fetch(`${tenantUrl}/api/2/webhooks`, {
    method: "POST",
    headers: {
        "content-type": "application/json",
        "authorization": `Token ${apiToken}`,
    },
    body: JSON.stringify({
        event_type: "CHATS.MESSAGE.CREATED",
        callback_url: callbackUrl,
    })
})
    .then(response => {
        console.debug(response);

        if (response.status === 201) {
            console.log("Webhook created!");
        } else {
            console.log("Error creating a webhook");
        }
    })
    .catch(err => {
        console.error(err);
    });

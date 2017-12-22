# MoodBot
This is a sample implementation of a chat bot to uses the Beekeeper SDK and Chat Bot SDK.

Every day at 9 AM it sends a message to all users asking them how they're feeling. It then records their response in a CSV file.

## How to Use
The application expects 2 command line parameters:

- **--tenantUrl**: The URL of the tenant, e.g. https://some-corp.beekeeper.io
- **--apiToken**: The API token of the bot account
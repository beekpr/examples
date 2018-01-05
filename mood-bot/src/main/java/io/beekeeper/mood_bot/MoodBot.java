package io.beekeeper.mood_bot;

import io.beekeeper.sdk.ChatBot;
import io.beekeeper.sdk.model.ConversationMessage;
import io.beekeeper.sdk.model.MessageType;

import static io.beekeeper.mood_bot.ControlMessages.CONTROL_BAD_MOOD;
import static io.beekeeper.mood_bot.ControlMessages.CONTROL_GREAT_MOOD;

public class MoodBot extends ChatBot {

    private MoodRecorder recorder;

    public MoodBot(String tenantUrl, String apiToken, MoodRecorder recorder) {
        super(tenantUrl, apiToken);
        this.recorder = recorder;
    }

    @Override
    public void onNewMessage(ConversationMessage message, ConversationHelper conversationHelper) {
        // Ignore all messages that have no text and are not control messages
        if (message.getText() == null || message.getType() != MessageType.CONTROL) {
            return;
        }

        try {
            if (message.getText().equals(CONTROL_GREAT_MOOD)) {
                conversationHelper.reply("Glad to hear :D");
                recorder.record(message.getCreated(), message.getUserId(), message.getUsername(), ":)");

            } else if (message.getText().equals(CONTROL_BAD_MOOD)) {
                conversationHelper.reply("Oh no :(! I hope you're feeling better tomorrow.");
                recorder.record(message.getCreated(), message.getUserId(), message.getUsername(), ":(");

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

package io.beekeeper.mood_bot;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import io.beekeeper.sdk.BeekeeperSDK;
import io.beekeeper.sdk.exception.BeekeeperException;
import io.beekeeper.sdk.iterator.UserProfileIterator;
import io.beekeeper.sdk.model.Conversation;
import io.beekeeper.sdk.model.UserProfile;
import io.beekeeper.sdk.params.InputPromptOptionParams;
import io.beekeeper.sdk.params.InputPromptParams;
import io.beekeeper.sdk.params.SendMessageParams;

public class SendPromptJob implements Job {

    public static final String KEY_TENANT_URL = "tenant_url";
    public static final String KEY_API_TOKEN = "api_token";

    @Override
    public void execute(JobExecutionContext context) {
        try {
            BeekeeperSDK sdk = getSDK(context);
            SendMessageParams message = createMessage();

            UserProfileIterator iterator = new UserProfileIterator(sdk);

            // Send a message to all users
            while (iterator.hasNext()) {
                iterator.advance();
                UserProfile profile = iterator.getCurrent();
                try {
                    Conversation conversation = sdk.getConversations().getConversationByUsername(profile.getUsername()).execute();
                    sdk.getConversations().sendMessage(conversation.getId(), message).execute();
                } catch (BeekeeperException e) {
                    e.printStackTrace();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private BeekeeperSDK getSDK(JobExecutionContext context) {
        String tenantUrl = context.getJobDetail().getJobDataMap().getString(KEY_TENANT_URL);
        String apiToken = context.getJobDetail().getJobDataMap().getString(KEY_API_TOKEN);
        return BeekeeperSDK.newInstance(tenantUrl, apiToken);
    }

    private SendMessageParams createMessage() {
        return SendMessageParams.builder()
                .text("How are you feeling today?")
                .inputPrompt(
                        InputPromptParams.builder()
                                .caption("Please select an option")
                                .option(
                                        InputPromptOptionParams.builder()
                                                .optionText("Great!")
                                                .messageText("I'm feeling great today")
                                                .controlText(ControlMessages.CONTROL_GREAT_MOOD)
                                                .build()
                                )
                                .option(
                                        InputPromptOptionParams.builder()
                                                .optionText("Not so great...")
                                                .messageText("I'm feeling not great today")
                                                .controlText(ControlMessages.CONTROL_BAD_MOOD)
                                                .build()
                                )
                                .build()
                )
                .build();
    }

}

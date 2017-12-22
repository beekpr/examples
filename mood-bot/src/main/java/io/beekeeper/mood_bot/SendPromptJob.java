package io.beekeeper.mood_bot;

import org.quartz.Job;
import org.quartz.JobExecutionContext;

import io.beekeeper.sdk.BeekeeperApi;
import io.beekeeper.sdk.exception.BeekeeperException;
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
            BeekeeperApi api = getApi(context);
            SendMessageParams message = createMessage();

            ProfileIterator iterator = new ProfileIterator(api);

            // Send a message to all users
            while (iterator.hasNext()) {
                iterator.advanceToNext();
                UserProfile profile = iterator.getCurrent();
                try {
                    Conversation conversation = api.getConversations().getConversationByUsername(profile.getUsername()).execute();
                    api.getConversations().sendMessage(conversation.getId(), message).execute();
                } catch (BeekeeperException e) {
                    e.printStackTrace();
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private BeekeeperApi getApi(JobExecutionContext context) {
        String tenantUrl = context.getJobDetail().getJobDataMap().getString(KEY_TENANT_URL);
        String apiToken = context.getJobDetail().getJobDataMap().getString(KEY_API_TOKEN);
        return BeekeeperApi.newInstance(tenantUrl, apiToken);
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

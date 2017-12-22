package io.beekeeper.mood_bot;

import java.io.File;

import org.quartz.SchedulerException;

import io.beekeeper.sdk.ChatBot;

/**
 * This is a sample implementation of the Beekeeper SDK and Chat Bot SDK.
 * It asks all users once per day how they're feeling and records the responses.
 */
public class Application {

    /**
     * The cron schedule when to send the messages
     */
    private static final String SCHEDULE = "0 0 9 ? * MON-FRI";

    /**
     * The CSV file to store the responses
     */
    private static final String OUTPUT_CSV_FILE = "moods.csv";

    public static void main(String[] args) throws SchedulerException {
        // Parse the command line arguments
        Arguments arguments = Arguments.parse(args);

        // Prepare recorder to store reponses in a CSV file
        File csvFile = new File(OUTPUT_CSV_FILE);
        MoodRecorder recorder = new MoodRecorder(csvFile);

        // Prepare the chat bot
        ChatBot moodBot = new MoodBot(arguments.tenantUrl, arguments.apiKey, recorder);

        // Prepare the scheduler
        MessageScheduler messageScheduler = new MessageScheduler(arguments.tenantUrl, arguments.apiKey);

        // Start all components
        moodBot.start();
        messageScheduler.start(SCHEDULE);
    }

}

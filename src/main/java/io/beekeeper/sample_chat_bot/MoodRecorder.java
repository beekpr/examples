package io.beekeeper.sample_chat_bot;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Date;

import io.beekeeper.sdk.util.DateUtil;

public class MoodRecorder {

    private final File csvFile;

    public MoodRecorder(File csvFile) {
        this.csvFile = csvFile;
    }

    public void record(Date date, String userId, String username, String mood) {
        try {
            FileWriter writer = new FileWriter(csvFile, true);
            writer.append(DateUtil.format(date));
            writer.append(',');
            writer.append(userId);
            writer.append(',');
            writer.append(username);
            writer.append(',');
            writer.append(mood);
            writer.append("\n");
            writer.flush();
            writer.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}

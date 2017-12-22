package io.beekeeper.sample_chat_bot;

import com.beust.jcommander.JCommander;
import com.beust.jcommander.Parameter;

public class Arguments {

    public static Arguments parse(String[] args) {
        Arguments arguments = new Arguments();
        JCommander commander = new JCommander(arguments);
        commander.parse(args);
        return arguments;
    }

    @Parameter(description = "The URL of the Beekeeper tenant. E.g. https://some-corp.beekeeper.io",
            required = true,
            names = {"--tenantUrl"})
    String tenantUrl;

    @Parameter(description = "The API access key for the account",
            required = true,
            names = {"--apiToken"})
    String apiKey;

}
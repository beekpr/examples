package io.beekeeper.sample_chat_bot;

import org.quartz.CronTrigger;
import org.quartz.JobDetail;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.TriggerBuilder;
import org.quartz.impl.StdSchedulerFactory;

import static org.quartz.CronScheduleBuilder.cronSchedule;
import static org.quartz.JobBuilder.newJob;

public class MessageScheduler {

    private final Scheduler scheduler;
    private final String tenantUrl;
    private final String apiToken;

    public MessageScheduler(String tenantUrl, String apiToken) throws SchedulerException {
        scheduler = StdSchedulerFactory.getDefaultScheduler();

        this.tenantUrl = tenantUrl;
        this.apiToken = apiToken;
    }

    public void start(String schedule) throws SchedulerException {
        scheduler.start();

        JobDetail job = newJob(SendPromptJob.class)
                .usingJobData(SendPromptJob.KEY_TENANT_URL, tenantUrl)
                .usingJobData(SendPromptJob.KEY_API_TOKEN, apiToken)
                .build();

        CronTrigger trigger = TriggerBuilder.newTrigger()
                .withSchedule(cronSchedule(schedule))
                .build();

        scheduler.scheduleJob(job, trigger);
    }

}

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/icon48.png",
        title: "Reminder",
        message: `Time's up for: ${alarm.name}`,
        priority: 2
    });
});

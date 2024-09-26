chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name.startsWith('alarm-')) {
        const taskName = alarm.name.split('-')[1]; // Get the task name from the alarm
        new Audio(chrome.runtime.getURL('timerNoise.wav')).play();
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'timer-48.png',
            title: 'Alarm Alert!',
            message: `Time for your task: ${taskName}`,
            priority: 2
        });
    }
});

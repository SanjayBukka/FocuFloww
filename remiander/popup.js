document.addEventListener("DOMContentLoaded", () => {
    const toggleDarkMode = document.getElementById("toggle-darkmode");
    const body = document.body;
    const setReminderBtn = document.getElementById("set-remainder");
    const activeReminders = document.getElementById("active-reminders");
    const alertSound = document.getElementById("alert-sound");

    // Restore dark mode setting
    chrome.storage.sync.get("darkMode", (data) => {
        toggleDarkMode.checked = data.darkMode || false;
        body.classList.toggle("dark-mode", toggleDarkMode.checked);
    });

    // Dark mode toggle
    toggleDarkMode.addEventListener("change", () => {
        const isDarkMode = toggleDarkMode.checked;
        chrome.storage.sync.set({ darkMode: isDarkMode });
        body.classList.toggle("dark-mode", isDarkMode);
    });

    // Set reminder button
    setReminderBtn.addEventListener("click", () => {
        const reminderText = document.getElementById("remainder-text").value;
        const reminderTime = document.getElementById("remainder-time").value;
        if (reminderText && reminderTime) {
            const reminderTimeInMinutes = parseInt(reminderTime);
            chrome.alarms.create(reminderText, { delayInMinutes: reminderTimeInMinutes });

            const reminderItem = document.createElement("li");
            reminderItem.innerText = `${reminderText} in ${reminderTime} minutes`;
            activeReminders.appendChild(reminderItem);
        }
    });

    // Listen for alarms
    chrome.alarms.onAlarm.addListener((alarm) => {
        alertSound.play();
        chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon48.png",
            title: "Reminder",
            message: alarm.name
        });
    });
});

// background.js

let isPomodoroActive = false;
let pomodoroDuration = 25 * 60; 
let breakDuration = 5 * 60; 
let timerId;

chrome.runtime.onInstalled.addListener(() => {
    console.log('Focus Flow Extension Installed!');
    chrome.storage.sync.set({ pomodoroDuration: 25, breakDuration: 5, isBlockingEnabled: true });
});
function startTimer(duration) {
    let remainingTime = duration;
    isPomodoroActive = true;
    chrome.storage.sync.set({ isPomodoroActive });
    timerId = setInterval(() => {
        if (remainingTime <= 0) {
            clearInterval(timerId);
            isPomodoroActive = false;
            chrome.storage.sync.set({ isPomodoroActive });
            alert('Pomodoro finished! Take a break.');
        } else {
            remainingTime--;
        }
    }, 1000);
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'getTimeSettings') {
        chrome.storage.sync.get(['pomodoroDuration', 'breakDuration'], (data) => {
            sendResponse({ pomodoroDuration: data.pomodoroDuration, breakDuration: data.breakDuration });
        });
        return true; 
    } else if (request.message === 'startPomodoro') {
        startTimer(pomodoroDuration);
        return true;
    } else if (request.message === 'stopPomodoro') {
        clearInterval(timerId);
        isPomodoroActive = false;
        chrome.storage.sync.set({ isPomodoroActive });
        return true;
    }
});

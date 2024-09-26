document.getElementById('startPomodoro').addEventListener('click', () => {
    chrome.runtime.sendMessage({ message: 'startPomodoro' }, (response) => {
        console.log('Pomodoro timer started.');
    });
});

document.getElementById('toggleBlocking').addEventListener('click', () => {
    chrome.storage.sync.get('isBlockingEnabled', (data) => {
        const newBlockingState = !data.isBlockingEnabled;
        chrome.storage.sync.set({ isBlockingEnabled: newBlockingState }, () => {
            alert(`Website blocking is now ${newBlockingState ? 'enabled' : 'disabled'}.`);
        });
    });
});

console.log('Current URL:', window.location.href);
function checkBlocking() {
    chrome.storage.sync.get(['isBlockingEnabled', 'isPomodoroActive'], (data) => {
        if (data.isBlockingEnabled && data.isPomodoroActive) {
            const blockedSites = [
                'twitter.com' 
            ];
            if (blockedSites.some(site => window.location.href.includes(site))) {
                alert('Access to this site is blocked! Please focus on your tasks.');
                window.location.href = 'about:blank';
            }
        }
    });
}
const style = document.createElement('link');
style.rel = 'stylesheet';
style.href = chrome.runtime.getURL('contentStyle.css');
document.head.appendChild(style);
checkBlocking();

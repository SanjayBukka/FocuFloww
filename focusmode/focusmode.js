document.getElementById('startFocus').addEventListener('click', () => {
    const blockedSites = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    chrome.storage.sync.set({ blockedSites }, () => {
        alert('Focus Mode started! Blocking sites: ' + blockedSites.join(', '));
        chrome.runtime.sendMessage({ message: 'blockSites', blockedSites });
    });
});

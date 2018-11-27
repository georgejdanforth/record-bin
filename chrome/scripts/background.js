const openOrFocusOptionsPage = () => {
    const optionsUrl = chrome.extension.getURL('index.html');
    chrome.tabs.query({}, extensionTabs => {
        for (let tab in extensionTabs) {
            if (optionsUrl === tab.url) {
                chrome.tabs.update(tab.id, { 'selected': true });
                return;
            }
        }

        chrome.tabs.create({ url: 'index.html' });
    });
};

chrome.extension.onConnect.addListener(
    port => port.onMessage.addListener(openOrFocusOptionsPage)
);

chrome.browserAction.onClicked.addListener(openOrFocusOptionsPage);

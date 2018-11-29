const openOrFocusOptionsPage = url => {

    const optionsUrl = chrome.runtime.getURL('index.html');
    const sendUrl = tab => setTimeout(() => {
        if (url) chrome.tabs.sendMessage(tab.id, { url });
    }, 700);

    chrome.tabs.query({ url: optionsUrl }, tabs => {
        if (tabs.length) {
            chrome.tabs.update(tabs[0].id, { 'highlighted': true, url: optionsUrl }, sendUrl);
        } else {
            chrome.tabs.create({ url: optionsUrl }, sendUrl);
        }
    });
};

chrome.extension.onConnect.addListener(
    port => port.onMessage.addListener(() => openOrFocusOptionsPage(null))
);

chrome.browserAction.onClicked.addListener(() => openOrFocusOptionsPage(null));

chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => openOrFocusOptionsPage(request.url)
);

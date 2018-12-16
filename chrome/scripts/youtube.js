(() => {
    /* eslint-disable no-console */
    /* eslint-disable no-undef */
    const iconUrl = chrome.runtime.getURL('images/record-bin-icon-16.png');
    const optionsUrl = chrome.runtime.getURL('index.html');

    const openOptionsPage = url => chrome.runtime.sendMessage({ url });
    /* eslint-enable no-undef */

    const createIcon = () => {
        const img = document.createElement('img');
        img.src = iconUrl;
        img.setAttribute('width', '12');
        img.setAttribute('height', '12');

        return img;
    };

    const createButton = () => {
        const button = document.createElement('button');
        button.type = 'button';
        button.addEventListener('click', () => openOptionsPage(window.location.href));

        button.appendChild(createIcon());

        return button;
    };

    const createAddButtonDiv = () => {
        const div = document.createElement('div');
        div.classList.add('add-rb');
        div.innerText = 'Add to Record Bin';
        div.prepend(createButton());

        return div;
    };

    const insertRecordBinButton = () => {
        const description = document.querySelector('ytd-expander');
        if (description) {
            const addButtonDiv = description.querySelector('div.add-rb');
            if (!addButtonDiv) description.prepend(createAddButtonDiv());
        }
    };

    (() => setInterval(insertRecordBinButton, 500))();
    /* eslint-enable no-console */
})();

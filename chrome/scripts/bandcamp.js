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

    const createButtonListItem = () => {
        const li = document.createElement('li');
        li.classList.add('add-rb');
        li.innerText = 'Add to Record Bin';
        li.prepend(createButton());

        return li;
    };

    const insertRecordBinButton = () => {
        const albumCommands = document.querySelector('ul.tralbumCommands');
        if (albumCommands) {
            const buttonListItem = albumCommands.querySelector('li.add-rb');
            if (!buttonListItem) albumCommands.prepend(createButtonListItem());
        }
    };
    /* eslint-enable no-console */

    insertRecordBinButton();
})();
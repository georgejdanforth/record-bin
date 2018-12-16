(() => {
    /* eslint-disable no-console */

    const buttonClasses = [
        'sc-button',
        'sc-button-responsive',
        'rb-button'
    ];

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

    const getButtonClasses = size => [`sc-button-${size}`, ...buttonClasses];

    const createButton = (url, size) => {
        const button = document.createElement('button');
        button.type = 'button';
        getButtonClasses(size).forEach(className => button.classList.add(className));
        button.addEventListener('click', () => openOptionsPage(url));

        button.appendChild(createIcon());

        return button;
    };

    const insertRecordBinButtons = () => {
        const listItems = document.getElementsByClassName('soundList__item');
        for (let i = 0; i < listItems.length; i++) {
            const button = listItems[i].querySelector('button.rb-button');
            if (!button) {
                const url = listItems[i].querySelector('a.soundTitle__title').href;
                const buttonGroup = listItems[i].querySelector('div.sc-button-group');
                buttonGroup.append(createButton(url, 'small'));
            }
        }

        const playlistItems = document.getElementsByClassName('systemPlaylistTrackList__item');
        for (let i = 0; i < playlistItems.length; i++) {
            const button = playlistItems[i].querySelector('button.rb-button');
            if (!button) {
                const url = playlistItems[i].querySelector('a.trackItem__trackTitle').href;
                const buttonGroup = playlistItems[i].querySelector('div.sc-button-group');
                buttonGroup.append(createButton(url, 'small'));
            }
        }

        const buttonGroup = document.querySelector('div.listenEngagement__actions div.sc-button-group');
        if (buttonGroup){
            const button = buttonGroup.querySelector('button.rb-button');
            if (!button) buttonGroup.append(createButton(window.location.href, 'medium'));
        }
    };

    (() => setInterval(insertRecordBinButtons, 500))();

    /* eslint-enable no-console */
})();
(() => {
    /* eslint-disable no-console */

    const buttonClasses = [
        'sc-button',
        'sc-button-small',
        'sc-button-responsive',
        'rb-button'
    ];

    /* eslint-disable no-undef */
    const iconUrl = chrome.runtime.getURL('images/record-bin-icon-16.png');
    /* eslint-enable no-undef */

    const createIcon = () => {
        const img = document.createElement('img');
        img.src = iconUrl;
        img.setAttribute('width', '12');
        img.setAttribute('height', '12');

        return img;
    };

    const createButton = url => {
        const button = document.createElement('button');
        button.type = 'button';
        buttonClasses.forEach(className => button.classList.add(className));
        button.addEventListener('click', () => console.log(url));

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
                buttonGroup.append(createButton(url));
            }
        }
    };

    (() => setInterval(insertRecordBinButtons, 500))();

    /* eslint-enable no-console */
})();
"use strict";
var _a;
const getCss = () => `
  .switch {
    position: relative;
    display: inline-block;
    width: 40px;
    height: 25px;
  }
  
  
  .toast {
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    padding: 1rem 2rem;
    margin: 0.5rem;
    cursor: pointer;
  }

  #toasts {
    position: fixed;
    bottom: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    z-index: 9999;
  }
  
  .switch input { 
    opacity: 0;
    width: 0;
    height: 0;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 34px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 17px;
    width: 17px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: #000;
  }
  
  input:focus + .slider {
    box-shadow: 0 0 1px #000;
  }
  .pic-switch-toggles {
    gap: 1rem;
  }
  .st_toggle {
    gap: 0.5rem;
  }
  
  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}`;
document.head.insertAdjacentHTML('beforeend', `<style>${getCss()}</style>`);
let togglesState = {
    isDev: false,
    isOptional: false
};
const packageManagers = {
    installers: {
        pnpm: 'i',
        yarn: 'add',
        npm: 'i'
    },
    dev: {
        pnpm: '-D',
        yarn: '-D',
        npm: '-D'
    },
    optional: {
        npm: '-O',
        yarn: '-O',
        pnpm: '-O'
    }
};
const packageManagerNameList = Object.keys(packageManagers.installers);
const sidebarEl = document.querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l');
sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.insertAdjacentHTML('afterbegin', `<div id="package-box"></div>`);
const packageBoxEl = document.getElementById('package-box');
const packageName = location.pathname.split('/').splice(2).join('/');
const toastContainer = document.createElement('div');
toastContainer.id = 'toasts';
(_a = document.querySelector('#app > div')) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement('afterbegin', toastContainer);
const cleanUp = () => {
    var _a, _b;
    (_a = document
        .querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p')) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document
        .querySelector('#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > h3')) === null || _b === void 0 ? void 0 : _b.remove();
};
cleanUp();
function generateCommand(manager, options = {
    isDev: togglesState.isDev,
    isOptional: togglesState.isOptional
}) {
    let commands = [manager, packageManagers.installers[manager]];
    if (options.isDev)
        commands.push(packageManagers.dev[manager]);
    if (options.isOptional)
        commands.push(packageManagers.optional[manager] || '');
    commands.push(packageName);
    return commands.join(' ');
}
const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
};
const toast = ({ text }) => {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = `<pre>${text}</pre>`;
    toastContainer.appendChild(toast);
    toast.addEventListener('click', () => {
        toast.remove();
    });
    setTimeout(() => {
        toast.remove();
    }, 2000);
};
const isDevSwitchButton = () => `<label class="switch">
  <input id="devDependenciesToggleButton" type="checkbox">
  <span class="slider"></span>
</label>`;
const isOptionalSwitchButton = () => `<label class="switch">
  <input id="optionalToggleButton" type="checkbox">
  <span class="slider"></span>
</label>`;
const header = () => `<div class="flex justify-between items-center">
  <h3 class="c84e15be f5 mt0 mb0">Install</h3>
  <div class="flex items-center pic-switch-toggles">
    <span class="mr1 f5 flex items-center st_toggle">is Dev${isDevSwitchButton()}</span>
    <span class="mr1 f5 flex items-center st_toggle">is Optional${isOptionalSwitchButton()}</span>
  </div>
</div>`;
const renderInstallPackageBox = (manager) => {
    const command = generateCommand(manager);
    return `<p id="${manager}-box" class="d767adf4 lh-copy truncate ph0 mb3 black-80 b5be2af6 f6 flex flex-row">
    <svg viewBox="0 0 12.32 9.33"><g><line class="st1" x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line><rect width="1.9" height="1.9"></rect><rect x="1.9" y="1.9" width="1.9" height="1.9"></rect><rect x="3.7" y="3.7" width="1.9" height="1.9"></rect><rect x="1.9" y="5.6" width="1.9" height="1.9"></rect><rect y="7.5" width="1.9" height="1.9"></rect></g></svg>
    <code class="flex-auto truncate db" title="Copy Command to Clipboard">
    <span role="button" tabindex="0">${command}</span>
    </code>
    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
</p>`;
};
const installPackageBoxes = () => {
    packageManagerNameList.map((manager) => {
        var _a, _b;
        (_a = document.getElementById(`${manager}-box`)) === null || _a === void 0 ? void 0 : _a.remove();
        packageBoxEl === null || packageBoxEl === void 0 ? void 0 : packageBoxEl.insertAdjacentHTML('afterbegin', renderInstallPackageBox(manager));
        const command = generateCommand(manager);
        return (_b = document.getElementById(`${manager}-box`)) === null || _b === void 0 ? void 0 : _b.addEventListener('click', () => {
            var _a;
            return (_a = copyToClipboard(command)) === null || _a === void 0 ? void 0 : _a.then(() => toast({
                text: `Copied '${command}' to clipboard`
            }));
        });
    });
};
installPackageBoxes();
sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.insertAdjacentHTML('afterbegin', header());
const toggles = {
    isDev: 'devDependenciesToggleButton',
    isOptional: 'optionalToggleButton'
};
Object.entries(toggles).forEach(([toggle, element]) => {
    var _a;
    (_a = document.getElementById(element)) === null || _a === void 0 ? void 0 : _a.addEventListener('change', (e) => {
        togglesState[toggle] = e.target.checked;
        installPackageBoxes();
    });
});

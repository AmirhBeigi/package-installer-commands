"use strict";
var _a, _b;
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
  
  input:checked + .slider:before {
    -webkit-transform: translateX(15px);
    -ms-transform: translateX(15px);
    transform: translateX(15px);
}`;
document.head.insertAdjacentHTML("beforeend", `<style>${getCss()}</style>`);
let isDev = false;
const installers = {
    pnpm: {
        dev: "pnpm i -D",
        prod: "pnpm i",
    },
    yarn: {
        dev: "yarn add -D",
        prod: "yarn add",
    },
    npm: {
        dev: "npm i -D",
        prod: "npm i",
    },
};
const packageManager = Object.keys(installers);
const sidebarEl = document.querySelector("#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l");
sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.insertAdjacentHTML("afterbegin", `<div id="package-box"></div>`);
const packageBoxEl = document.getElementById("package-box");
const packageName = location.pathname.split("/").splice(2).join("/");
const toastContainer = document.createElement("div");
toastContainer.id = "toasts";
(_a = document.querySelector("#app > div")) === null || _a === void 0 ? void 0 : _a.insertAdjacentElement("afterbegin", toastContainer);
const cleanUp = () => {
    var _a, _b;
    (_a = document
        .querySelector("#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p")) === null || _a === void 0 ? void 0 : _a.remove();
    (_b = document
        .querySelector("#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > h3")) === null || _b === void 0 ? void 0 : _b.remove();
};
cleanUp();
const copyToClipboard = (str) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText)
        return navigator.clipboard.writeText(str);
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
};
const toast = ({ text }) => {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerHTML = `<pre>${text}</pre>`;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 2000);
};
const switchButton = () => `<label class="switch">
  <input id="devDependenciesToggleButton" type="checkbox">
  <span class="slider"></span>
</label>`;
const header = () => `<div class="flex justify-between items-center">
  <h3 class="c84e15be f5 mt0 mb0">Install</h3>
  <div class="flex items-center">
    <span class="mr1 f5">is Dev</span>${switchButton()}
  </div>
</div>`;
const renderInstallPackageBox = ({ manager, name, isDev, }) => {
    return `<p id="${manager}-box" class="d767adf4 lh-copy truncate ph0 mb3 black-80 b5be2af6 f6 flex flex-row">
    <svg viewBox="0 0 12.32 9.33"><g><line class="st1" x1="7.6" y1="8.9" x2="7.6" y2="6.9"></line><rect width="1.9" height="1.9"></rect><rect x="1.9" y="1.9" width="1.9" height="1.9"></rect><rect x="3.7" y="3.7" width="1.9" height="1.9"></rect><rect x="1.9" y="5.6" width="1.9" height="1.9"></rect><rect y="7.5" width="1.9" height="1.9"></rect></g></svg>
    <code class="flex-auto truncate db" title="Copy Command to Clipboard">
    <span role="button" tabindex="0">${installers[manager][isDev ? "dev" : "prod"]} ${name}</span>
    </code>
    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="copy" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"></path></svg>
</p>`;
};
const installPackageBoxes = () => {
    packageManager.map((manager) => {
        var _a, _b;
        (_a = document.getElementById(`${manager}-box`)) === null || _a === void 0 ? void 0 : _a.remove();
        packageBoxEl === null || packageBoxEl === void 0 ? void 0 : packageBoxEl.insertAdjacentHTML("afterbegin", renderInstallPackageBox({ manager, name: packageName, isDev }));
        return (_b = document.getElementById(`${manager}-box`)) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            var _a;
            return (_a = copyToClipboard(`${installers[manager][isDev ? "dev" : "prod"]} ${packageName}`)) === null || _a === void 0 ? void 0 : _a.then(() => toast({
                text: `Copied '${installers[manager][isDev ? "dev" : "prod"]} ${packageName}' to clipboard`,
            }));
        });
    });
};
installPackageBoxes();
sidebarEl === null || sidebarEl === void 0 ? void 0 : sidebarEl.insertAdjacentHTML("afterbegin", header());
(_b = document.getElementById("devDependenciesToggleButton")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", (e) => {
    isDev = e.target.checked;
    installPackageBoxes();
});

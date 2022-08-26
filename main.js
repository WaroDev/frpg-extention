// ==UserScript==
// @name         FarmRPG - Extension by Waro
// @version      0.12.2
// @description  An extension for the game 'Farm RPG' which adds a lot of different features 
// @author       Waro
// @match        https://farmrpg.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=farmrpg.com
// @downloadURL  https://raw.githubusercontent.com/war0/frpg-extention/main/main.js
// @updateURL    https://raw.githubusercontent.com/war0/frpg-extention/main/main.js
// ==/UserScript==

(function() {
    'use strict';
    
    console.log('Starting FRPG extension...');
    
    const elmChat = document.querySelector("#desktopchatpanel");
    const elmViews = document.querySelector(".views");
    
    
    
    
    const css_class = "ext-menu-text";
    const widthMenu = "50px";
    let showMenuText = false;

    let newCSS = document.createElement('style');
    document.head.appendChild(newCSS);
    let sheet = newCSS.sheet;
    var styles = `.${css_class} {`;
    styles += 'display: none';
    styles += '}';
    sheet.insertRule(styles, 0);

    let menu = document.querySelector(".panel.panel-left.panel-cover");
    const oldMenuWidth = `${menu.offsetWidth}px`;
    menu.style.width = widthMenu;

    let mainview = document.querySelector(".view-main");
    mainview.style.width = `calc(100% - ${widthMenu})`;

    let menuRight = document.querySelector(".navbar .right");
    let btn = document.createElement("button");
    btn.innerHTML = "&nbsp;";
    btn.style.background = "none";
    btn.style.border = "none";
    btn.style.backgroundImage = "url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyBzdHlsZT0iY29sb3I6IHdoaXRlIiBoZWlnaHQ9IjMycHgiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxwYXRoIGQ9Ik00LDEwaDI0YzEuMTA0LDAsMi0wLjg5NiwyLTJzLTAuODk2LTItMi0ySDRDMi44OTYsNiwyLDYuODk2LDIsOFMyLjg5NiwxMCw0LDEweiBNMjgsMTRINGMtMS4xMDQsMC0yLDAuODk2LTIsMiBzMC44OTYsMiwyLDJoMjRjMS4xMDQsMCwyLTAuODk2LDItMlMyOS4xMDQsMTQsMjgsMTR6IE0yOCwyMkg0Yy0xLjEwNCwwLTIsMC44OTYtMiwyczAuODk2LDIsMiwyaDI0YzEuMTA0LDAsMi0wLjg5NiwyLTIgUzI5LjEwNCwyMiwyOCwyMnoiIGZpbGw9IndoaXRlIj48L3BhdGg+PC9zdmc+)";
    btn.style.backgroundRepeat = "no-repeat";
    btn.style.backgroundSize = "cover";
    btn.style.position = "relative";
    btn.style.right = "10px";
    btn.style.cursor = "pointer";
    btn.onclick = function(e) {
        toggleMenuText();
    }
    menuRight.appendChild(btn);

    Array.from(document.querySelectorAll(".fa.fa-fw")).map(elm => elm = elm.parentElement).forEach(elm => {
        elm.parentElement.style.backgroundImage = "none";  // remove arrow

        let parts = elm.innerHTML.split("</i>");
        parts[0] = parts[0] + "</i>";
        parts[1] = `<span class="${css_class}">${parts[1]}</span>`;
        elm.innerHTML = parts.join('');
    });

    function toggleMenuText() {
        if (showMenuText) {
            sheet.cssRules[0].style.display = "none";
            menu.style.width = widthMenu;
            mainview.style.width = `calc(100% - ${widthMenu})`;
            showMenuText = false;
        }
        else {
            sheet.cssRules[0].style.display = "initial";
            menu.style.width = oldMenuWidth;
            mainview.style.width = `calc(100% - ${oldMenuWidth})`;
            showMenuText = true;
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

    const bgcolor = "bgcolor";
    const bgurl = "bgurl";
    const showbgimage = "showbgimage";
    const fontsize = "fontsize";
    const chatwidth = "chatwidth";
    const highlighttrades = "highlighttrades";

    let params = new Map();
    mapParam(params, bgcolor, "");
    mapParam(params, bgurl, "");
    mapParam(params, showbgimage, false);
    mapParam(params, fontsize, "12px");
    mapParam(params, chatwidth, "20");
    mapParam(params, highlighttrades, false);


    // set provided settings
    params.forEach( (value, option) => {
        switch (option) {
            case bgcolor:
                elmChat.style.setProperty('background-color', value, 'important');
                break;
            case showbgimage:
                if (value == "true") {
                    for (let i=0; i < document.styleSheets[3].cssRules.length; i++) {
                        if (document.styleSheets[3].cssRules[i].selectorText == '#desktopchatpanel') {
                            document.styleSheets[3].cssRules[i].style.removeProperty("background-image");
                            break;
                        }
                    }
                    elmChat.style.backgroundRepeat = "no-repeat";
                    elmChat.style.backgroundSize = "cover";
                }
                break;
            case bgurl:
                if (value != '') {
                    elmChat.style.setProperty('background-image', `url(${value})`, 'important');
                }
                break;
            case fontsize:
                for (let i=0; i < document.styleSheets[3].cssRules.length; i++) {
                    if (document.styleSheets[3].cssRules[i].selectorText == '.chat-txt') {
                        document.styleSheets[3].cssRules[i].style.fontSize = value;
                        break;
                    }
                }
                break;
            case chatwidth:
                if (elmViews) {
                    elmChat.style.width = `${value}%`;
                    elmViews.style.width = `${100 - value}%`;
                }
                break;

            case highlighttrades:
                if (value == "true") {
                    // color "buying" and "selling" messages
                    setInterval(() => {
                        let aChatMessages = document.querySelectorAll(".chat-txt");
                        for (let i=0; i< aChatMessages.length; i++) {
                            let aSpans = aChatMessages[i].querySelectorAll("span");
                            if (aSpans[1].innerHTML.indexOf("@") != -1) {
                                continue;
                            }

                            let message = aSpans[1].innerText.toLowerCase();

                            if (message.indexOf("buying") != -1 || message.indexOf("buy") != -1 || message.indexOf("lf") != -1) {
                                aSpans[1].style.color = "rgb(245 96 96)";
                                aSpans[1].style.fontWeight = "bold";
                                aChatMessages[i].style.border = "1px solid rgb(245 96 96)";
                            }

                            if (message.indexOf("selling") != -1 || message.indexOf("sell") != -1) {
                                aSpans[1].style.color = "#62f362";
                                aSpans[1].style.fontWeight = "bold";
                                aChatMessages[i].style.border = "1px solid #62f362";
                            }
                        }
                    }, 500);
                }
                break;
        }
    });

    // add chat customizing options
    const elmParentForInputs = document.querySelector("#desktopchatpanel .content-block-title");

    const elmWrapper = document.createElement('div');
    elmWrapper.style.display = "none";
    elmWrapper.style.textAlign = "left";
    elmWrapper.style.marginTop = "20px";

    //let btnShowOptions = document.createElement('button');
    let btnShowOptions = document.createElement('a');
    btnShowOptions.setAttribute("href", "#");
    btnShowOptions.innerText = "Show settings";
    btnShowOptions.onclick = function() {
        if (elmWrapper.style.display == "none") {
            elmWrapper.style.display = "block";
            btnShowOptions.innerText = "Hide settings";
        }
        else {
            elmWrapper.style.display = "none";
            btnShowOptions.innerText = "Show settings";
        }
    };
    elmParentForInputs.appendChild(btnShowOptions);

    let elmBGColorInput = createSettingsElement('input', 'BG color: ', elmWrapper, new Map([["width", "15ch"]]) );
    elmBGColorInput.value = params.get(bgcolor);
    elmBGColorInput.onchange = function() {
        storeParam(bgcolor, elmBGColorInput.value);
    };

    let elmShowBGImage = createSettingsElement('input', 'Show BG Image: ', elmWrapper, new Map([["width", "2ch"]]) );
    elmShowBGImage.type = "checkbox";
    elmShowBGImage.checked = params.get(showbgimage);
    elmShowBGImage.onchange = function() {
        storeParam(showbgimage, elmShowBGImage.checked);
    };

    let elmBGImageUrl = createSettingsElement('input', 'BG image URL: ', elmWrapper, new Map([["maxWidth", "50ch"]]) );
    elmBGImageUrl.value = params.get(bgurl);
    elmBGImageUrl.onchange = function() {
        storeParam(bgurl, elmBGImageUrl.value);
    };

    let elmFontSize = createSettingsElement('input', 'Font size: ', elmWrapper, new Map([["width", "5ch"]]) );
    elmFontSize.value = params.get(fontsize);
    elmFontSize.onchange = function() {
        storeParam(fontsize, elmFontSize.value);
    };

    let elmChatWidth = createSettingsElement('input', 'Chat width (%): ', elmWrapper, new Map([["width", "4ch"]]) );
    elmChatWidth.value = params.get(chatwidth);
    elmChatWidth.onchange = function() {
        storeParam(chatwidth, elmChatWidth.value);
    };

    let elmHighlightTrades = createSettingsElement('input', 'Highlight trades: ', elmWrapper, new Map([["width", "2ch"]]) );
    elmHighlightTrades.type = "checkbox";
    elmHighlightTrades.checked = params.get(highlighttrades);
    elmHighlightTrades.onchange = function() {
        storeParam(highlighttrades, elmHighlightTrades.checked);
    };

    let btnReload = document.createElement('button');
    btnReload.innerText = "Save & Reload";
    btnReload.onclick = function() {
        reload();
    };
    elmWrapper.appendChild(btnReload);


    let elmSpace1 = createSettingsElement('div', '', elmWrapper, new Map([["height", "4ch"]]) );
    let btnReset = document.createElement('button');
    btnReset.innerText = "Reset to default";
    btnReset.onclick = function() {
        resetAll();
    };
    elmWrapper.appendChild(btnReset);

    elmParentForInputs.appendChild(elmWrapper);

    // helper functions
    function mapParam(mMap, sParam, defaultValue) {
        mMap.set(sParam, hasParam(sParam) ? readParam(sParam) : defaultValue);
    }
    function storeParam(paramName, newParamValue) {
        if (newParamValue == '') {
            localStorage.removeItem(paramName);
        }
        else {
            localStorage.setItem(paramName, newParamValue);
        }
    }
    function readParam(paramName) {
        return localStorage.getItem(paramName);
    }

    function hasParam(paramName) {
        let a = localStorage.getItem(paramName);
        if (a) {
            return true;
        }
        else {
            return false;
        }
    }

    function reload() {
        location.reload();
    }

    function createSettingsElement(sType, sLabelText, oParent, aStyleAttrs) {
        let elmWrapperDiv = document.createElement('div');
        elmWrapperDiv.style.display = "grid";
        elmWrapperDiv.style.setProperty("grid-template-columns", "1fr 2fr");
        let elmLabel = document.createElement('label');
        elmLabel.innerText = sLabelText;
        elmWrapperDiv.appendChild(elmLabel);
        let elmNewSetting = document.createElement(sType);
        aStyleAttrs.forEach( (attrVal, attrName) => {
            elmNewSetting.style[attrName] = attrVal;
        });
        elmWrapperDiv.appendChild(elmNewSetting);
        oParent.appendChild(elmWrapperDiv);

        return elmNewSetting;
    }

    function resetAll() {
        params.forEach( (value, param) => {
            localStorage.removeItem(param);
        });
        reload();
    }
    
    
    
    
    
    
    
    
    
    if (location.href.indexOf("script=onlychat") !== -1 ) {
        document.title = "Farm RPG - Only Chat";

        // remove other views
        elmViews.remove();

        // make chat fullscreen
        elmChat.style.left = "0px";
        elmChat.style.width = "100%";
        elmChat.style.display = "block";
    }
    
    console.log('Extension fully loaded!');
})();

// ==UserScript==
// @name         天天基金实时净值
// @description  根据天天基金页面提供的股票持仓计算预估涨幅，不代表真实涨幅
// @namespace    http://tampermonkey.net/
// @version      1.0
// @author       You
// @match        https://fund.eastmoney.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// @require      https://cdnjs.cloudflare.com/ajax/libs/decimal.js/9.0.0/decimal.min.js
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/546599/%E5%A4%A9%E5%A4%A9%E5%9F%BA%E9%87%91%E5%AE%9E%E6%97%B6%E9%A2%84%E4%BC%B0.user.js
// @updateURL https://update.greasyfork.org/scripts/546599/%E5%A4%A9%E5%A4%A9%E5%9F%BA%E9%87%91%E5%AE%9E%E6%97%B6%E9%A2%84%E4%BC%B0.meta.js
// ==/UserScript==

var line = document.createElement("span");
line.classList.add("dataOfFund-line")


var dataItem03 = document.getElementsByClassName('dataItem03')[0];
console.log(dataItem03)
dataItem03.parentElement.insertBefore(line, dataItem03)

var dtp_span = dataItem03.querySelector('dt p span')
dtp_span.textContent = '净值估算'

var dataNums = dataItem03.querySelector('.dataNums')

var span_2 = document.createElement("span");
span_2.classList.add("ui-font-middle")
span_2.classList.add("ui-color-red")
span_2.classList.add("ui-num")
dataNums.appendChild(span_2);
var span_1 = dataItem03.querySelector('.dataNums span')

(function () {
    'use strict';

    // Your code here...

    var refreshFundGZ = function () {
        reGetGZ();
        setInterval(function () {
            var today = new Date();
            reGetGZ()
            if (today.getDay() > 0 && today.getDay() < 6) {
                if (today.getHours() >= 9 && today.getHours() < 12) {
                    reGetGZ()
                } else {
                    if (today.getHours() >= 13 && today.getHours() < 15) {
                        reGetGZ()
                    }
                }
            }
        }, 30000)
    };

    refreshFundGZ()

    jsonpgz = function (data) {
        if (data) {
            span_1.textContent = data.gsz;
            span_2.textContent = data.gszzl + '%';
        }
    }

})();
import Cookies from 'js-cookie';
import { OA_URL_PRO, OA_URL_TEST } from './constant.js';
const { Base64 } = require('js-base64');
const bodyDom = document.querySelector('body')

/**
 * @description 获取 url 参数
 * @param {string} variable
 * @returns {string}
 */
export function getQueryVariable(variable) {
  const query = location.search.substring(1);
  const arr = query.split('&');
  for (let i = 0; i < arr.length; i++) {
    const pair = arr[i].split('=');
    if (pair[0] === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return false;
}

/**
 * @description blob对象转base64
 * @param {Blob} file blob对象
 */
export function getBase64(file) {
  return new Promise(resolve => {
    let reader = new FileReader();
    if (file) {
      let imgUrlBase64 = reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      return imgUrlBase64;
    }
  });
}

/**
 * @description 消息提示弹窗
 * @param {string} bodyTxt 显示的提示语
 * @param {标题} titleTxt 显示的提示语
 *
 */
export function showDialog(bodyTxt = '用户名或密码错误', titleTxt = '提示', action = false) {
  let dialog = document.querySelector('.dialog');
  if (dialog) {
    removeElement(dialog);
  }
  const dom = document.createElement('div');
  dom.className = 'dialog';

  let inputLogin = document.querySelectorAll('.input-login');
  if (inputLogin && inputLogin.length > 0) {
    for (let i = 0; i < inputLogin.length; i++) {
      inputLogin[i].blur();
    }
  }
  dom.innerHTML = `<div id='msgBox-mask'>
      <div id='msgBox-main'>
        <div id='msgBox-head'>${titleTxt}</div>
        <div id='msgBox-body'>${bodyTxt}</div>
        <div id='msgBox-footer'>
          <div id='msgBox-confirm'>
            确定
          </div>
        </div>
      </div>
    </div>`;
  bodyDom.appendChild(dom);

  const confirmBtn = document.querySelector('#msgBox-confirm');
  const messageBox = document.querySelector('#msgBox-mask');
  confirmBtn.onclick = () => {
    if (action) {
      eval(action);
    }
    removeElement(messageBox);
  };
}

/**
 * @description 登录成功返回原系统
 */
export function backToOriginalSystem() {
  const loading = new Loading();
  loading.show();
  removeElement(bodyDom.children[0])
  let oaUrl = '';
  if (process.env.APP_MODE === 'pro') {
    oaUrl = OA_URL_PRO;
  } else {
    oaUrl = OA_URL_TEST;
  }
  let returnUrl = getQueryVariable('returnUrl') || oaUrl;
  if (returnUrl.substr(-1, 1) === '?') {
    returnUrl = returnUrl.substring(0, returnUrl.length - 1);
  }
  returnUrl += returnUrl.indexOf('?') > -1 ? '&' : '?';
  const url = returnUrl + 'token=' + sessionStorage.getItem('token');
  debugger;
  location.href = url
}

/**
 * @description 不能连续字符（如123、abc）连续3位或3位以上
 * @param {string} str password
 * @returns {boolean}
 */
export function LxStr(str) {
  const arr = str.split('');
  let boo = arr.some((value, index, array) => {
    if (array.length <= index + 2) return false;
    const t = array[index + 2].charCodeAt();
    const s = array[index + 1].charCodeAt();
    const f = value.charCodeAt();
    return t - s === 1 && s - f === 1;
  });
  return boo;
}

export function getCookie(name) {
  return Cookies.get(name);
}

export function setCookie(name, value, opt = {}) {
  Cookies.set(name, value, opt);
}

export function removeCookie(name, opt = { path: '' }) {
  debugger;
  Cookies.remove(name, opt); // removed!
}

export function removeToken() {
  sessionStorage.getItem('token') && sessionStorage.removeItem('token');
  localStorage.getItem('token') && localStorage.removeItem('token');
  debugger;
  getCookie('ssotoken') && setCookie('ssotoken', '');
}
export function splitQuery() {
  let href = location.href;
  let query = '';
  if (href.split('?')[1]) {
    href.split('?').forEach((el, index) => {
      if (index === 0) {
        query += '?';
      } else {
        query += el;
      }
    });
  }
  console.log(query, href);
  // if (query === '?') return '';
  return query;
}

export class Router {
  replace(router) {
    location.replace(router);
  }
  push(router, q = '') {
    let query = splitQuery();
    console.log('query:', query);
    debugger;
    // console.log(router.indexOf('login.html') !== -1, query.indexOf('forget') !== -1);
    // 去登录带forget，去掉forget
    if (router.indexOf('login.html') !== -1 && query.indexOf('forget') !== -1) {
      query = query.replace('forget', '');
    }
    if (query === '?') {
      query = '';
    }
    if (router.indexOf('?') !== -1 && query && query[0] === '?') {
      query = query.replace('?', '&');
    }
    location.href = router + query;
  }
}

/**
 * @description loading 动画效果
 */
export class Loading {
  show(text = '加载中') {
    const loading = document.querySelector('.loading');
    if (loading) removeElement(loading);
    const dom = document.createElement('div');
    dom.innerHTML = `<div class="loading">
                        <div class="loading-img">
                            <img src=${require('../assets/images/loading.png')} />
                            <div class="text">${text}<span class="dotting"></span></div>
                        </div>
                      </div>
                    `;
    bodyDom.appendChild(dom);
  }
  hide() {
    const loading = document.querySelector('.loading');
    if (loading) removeElement(loading);
  }
}

/**
 * @description 密码加密
 */
export function encrypt(pass) {
  // 密码
  // 头部3位随机数
  let first =
    String(Math.floor(Math.random() * 10)) +
    String(Math.floor(Math.random() * 10)) +
    String(Math.floor(Math.random() * 10));
  // 尾部4位随机数
  let last =
    String(Math.floor(Math.random() * 10)) +
    String(Math.floor(Math.random() * 10)) +
    String(Math.floor(Math.random() * 10)) +
    String(Math.floor(Math.random() * 10));
  // 拼接
  pass = first + pass + last;
  // 反转
  pass = pass.split('').reverse().join('');
  // base64 编码
  pass = Base64.encode(pass);
  return pass;
}

/**
 * @description 删除DOM
 * @param {Html} _element
 */
export function removeElement(_element) {
  var _parentElement = _element.parentNode;
  if (_parentElement) {
    _parentElement.removeChild(_element);
  }
}

import './index.scss';
import '@/assets/css/common.css';
import { splitQuery } from '@/utils/';
import { IS_MOBILE } from '@/utils/constant.js';

String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, '');
};

window.onload = function () {
  let href = location.href;
  const query = splitQuery();
  console.log(query);
  debugger;
  if (href.indexOf('/#/account/feishulogin') !== -1) {
    href = href.replace('/#/account/feishulogin', '/feishulogin.html');
    location.href = href;
  } else if (IS_MOBILE) {
    const url = location.origin + '/mobile.html' + query;
    location.href = url;
  } else {
    const url = location.origin + '/login.html' + query;
    location.href = url;
  }
};

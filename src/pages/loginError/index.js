import './index.scss';
import '@/assets/css/common.css';

import { getQueryVariable } from '@/utils/';

const messageDOM = document.querySelector('.message');
const messageValue = getQueryVariable('message') || '';

window.onload = function () {
  messageDOM.innerHTML = `<div>${messageValue}</div>`;
};

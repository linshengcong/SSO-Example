import { showDialog, Router, Loading } from '@/utils/';
import { sendSMS, checkSmsValidit } from '@/API/';
import { IS_MOBILE } from '@/utils/constant.js';

const confirm = document.querySelector('.forget-password-confirm');
const phoneDOM = document.querySelector('.phone-input');
const codeDOM = document.querySelector('.code-input');
const getCodeBtn = document.querySelector('.get-code');
const router = new Router();
const loading = new Loading();
let phoneError = true;
let timerLock = false;
let codeError = false;

window.onload = function () {
  phoneDOM.oninput = event => {
    let value = event.target.value.trim();
    if (value && value.length === 11 && /^1[3456789]\d{9}$/.test(value)) {
      phoneError = false;
      !timerLock && removeCodeDisable();
    } else {
      phoneError = true;
      setCodeDisable();
    }
  };

  codeDOM.oninput = event => {
    let value = event.target.value.trim();
    console.log(value);
    if (!value) {
      codeError = true;
    } else {
      codeError = false;
    }
  };

  getCodeBtn.onclick = async function () {
    if (isDisabled()) return;
    let param = { mobile: phoneDOM.value };
    loading.show();
    let res = await sendSMS(param).finally(() => loading.hide());
    if (res.status !== 0) return showDialog(res.message || '服务器错误');

    setCodeDisable();
    let count = 60;
    timerLock = true;
    let timer = setInterval(() => {
      if (count === 0) {
        this.textContent = '获取验证码';
        clearInterval(timer);
        timerLock = false;
        !phoneError && removeCodeDisable();
      } else {
        this.textContent = '剩余 ' + count + 's';
        count--;
      }
    }, 1000);
  };

  confirm.onclick = async function () {
    handleLogin();
  };
  phoneDOM.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
      handleLogin();
    }
  };
  codeDOM.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
      handleLogin();
    }
  };
};

/**
 * @description 登录逻辑
 */
async function handleLogin() {
  const isValid = validateForm();
  if (!isValid) return;
  const code = codeDOM.value;
  const mobile = phoneDOM.value;
  loading.show();
  let { status, message, secretKey, userNames } = await checkSmsValidit(mobile, code).finally(() => loading.hide());
  if (status !== 0) return showDialog(message || '服务器错误');
  sessionStorage.setItem('secretKey', secretKey);
  if (userNames && userNames.length > 0) {
    sessionStorage.setItem('userNames', JSON.stringify(userNames));
  }
  if (IS_MOBILE) {
    router.push('changePwdMobile.html?forget');
  } else {
    router.push('changePwdPC.html?forget');
  }
}

/**
 * @description 设置验证码禁用状态
 */
let setCodeDisable = () => {
  if (!isDisabled()) getCodeBtn.classList.add('disabled');
};

/**
 * @description 获取验证码禁用状态
 * @returns {boolean}
 */
let isDisabled = () => getCodeBtn.getAttribute('class').indexOf('disabled') > 0;

/**
 * @description 去除验证码禁用状态
 */
let removeCodeDisable = () => {
  if (isDisabled()) getCodeBtn.setAttribute('class', 'get-code');
};

/**
 * @description 校验表单
 * @returns {boolean}
 */
function validateForm() {
  const phone = String(phoneDOM.value).trim();
  const code = codeDOM.value.trim();
  if (!phone) {
    showDialog('请输入花名册手机号');
    return false;
  } else if (phone.length !== 11 || !/^1[3456789]\d{9}$/.test(phone)) {
    showDialog('请输入正确格式花名册手机号');
    return false;
  } else if (!code) {
    showDialog('请输入验证码');
    return false;
  } else {
    return true;
  }
}

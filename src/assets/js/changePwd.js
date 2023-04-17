import {
  showDialog,
  LxStr,
  getQueryVariable,
  removeToken,
  Router,
  Loading,
  encrypt,
  removeElement
} from '@/utils/';
import { updatePassword, smsUpdatePwd, logout, firstLoginUpdatePwd } from '@/API/';
import { OA_ID_TEST, OA_ID_PRO, IS_MOBILE } from '@/utils/constant.js';

let OA_ID = '';
if (process.env.APP_MODE === 'pro') {
  OA_ID = OA_ID_PRO;
} else {
  OA_ID = OA_ID_TEST;
}

const id = getQueryVariable('appId') || OA_ID;
const confirm = document.querySelector('#confirm-password');
const newPassword = document.querySelector('.new-password');
const oldPassword = document.querySelector('.old-password');
const confirmPassword = document.querySelector('.change-password-confirm');
const forget = getQueryVariable('forget');
const oldPwdDOM = document.querySelector('.changePasswordPage-old-pass');
const router = new Router();
const select = document.querySelector('#select');
const account = document.querySelector('.changePasswordPage-account');
const loading = new Loading();

window.onload = function () {
  if (forget) {
    oldPwdDOM.style.display = 'none';
  }
  const userNames = sessionStorage.getItem('userNames') && JSON.parse(sessionStorage.getItem('userNames'));
  // 手机号对应多个账号，设置下拉选择账号
  if (userNames) {
    showAccountSelect(userNames);
    showDialog('检测到您的手机对应多个账号，请选择账号后提交');
  }
  confirm.onclick = async function () {
    handleLogin();
  };

  newPassword.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
      handleLogin();
    }
  };
  oldPassword.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
      handleLogin();
    }
  };
  confirmPassword.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode == 13) {
      handleLogin();
    }
  };
};

/**
 * @description 校验表单
 * @returns {boolean}
 */
function validateForm() {
  console.log(newPassword.value, confirmPassword.value);
  let oldPasswordValue = '';
  if (!forget) {
    oldPasswordValue = oldPassword.value;
  }
  const newPwdValue = newPassword.value;
  const confirmPwdValue = confirmPassword.value;
  let reg = new RegExp(/^(?![^a-zA-Z]+$)(?!\D+$)/);
  let re = /(\w)*(\w)\2{2}(\w)*/g;

  // 忘记密码不需要设置就密码
  if (!forget && !oldPasswordValue) {
    return showDialog('请填写旧密码');
  } else if (!forget && oldPasswordValue === newPwdValue) {
    return showDialog('旧密码不能与新密码一致');
  } else if (!newPwdValue) {
    return showDialog('请填写新密码');
  } else if (newPwdValue.length < 6) {
    return showDialog('新密码长度为6到20位');
  } else if (newPwdValue.length > 20) {
    return showDialog('新密码长度为6到20位');
  } else if (!reg.test(newPwdValue)) {
    return showDialog('新密码至少包含一位数字和字母');
  } else if (LxStr(newPwdValue)) {
    return showDialog('不能连续字符（如123、abc）连续3位或3位以上');
  } else if (re.test(newPwdValue)) {
    return showDialog('不能相同字符（如111、aaa）连续3位或3位以上');
  } else if (!confirmPwdValue) {
    return showDialog('请确认新密码');
  } else if (newPwdValue != confirmPwdValue) {
    return showDialog('两次密码不一致');
  } else {
    return true;
  }
}

function showAccountSelect(userNames) {
  account.style.display = 'block';
  for (let i = 0; i < userNames.length; i++) {
    let opt = document.createElement('option');
    opt.value = userNames[i];
    opt.innerText = userNames[i];
    select.appendChild(opt);
  }
}

/**
 * @description
 */
async function handleLogin() {
  const isValid = validateForm();
  console.log(sessionStorage.getItem('userNames'), sessionStorage.getItem('secretKey'), 'session');
  const userNames = sessionStorage.getItem('userNames') && JSON.parse(sessionStorage.getItem('userNames'));
  const secretKey = sessionStorage.getItem('secretKey');

  if (!isValid) return;
  if (!forget) {
    if (secretKey) {
      // 首次登录 密码过期用 secretKey
      let formData = new FormData();
      formData.append('secretKey', secretKey);
      formData.append('newPwd', encrypt(confirmPassword.value));
      formData.append('oldPwd', encrypt(oldPassword.value));

      loading.show();
      let res = await firstLoginUpdatePwd(formData).finally(() => loading.hide());
      if (res.status === 0) {
        let v = await logout(id).catch(e => e);
        console.log(v);
        debugger;
        removeToken();
        showToLoginDialog('修改成功');
      } else {
        showDialog(res.message || '系统错误');
      }
    } else {
      // 正常修改密码 用token
      const data = {
        newPwd: encrypt(newPassword.value),
        confirmNewPwd: encrypt(confirmPassword.value),
        oldPwd: encrypt(oldPassword.value)
      };
      loading.show();
      let res = await updatePassword(id, data).finally(() => loading.hide());
      if (res.status === 0) {
        await logout(id).catch(e => e);
        removeToken();
        showToLoginDialog('修改成功');
      } else {
        showDialog(res.message || '系统错误');
      }
    }
  } else {
    // 忘记密码
    let formData = new FormData();
    formData.append('secretKey', secretKey);
    formData.append('newPwd', encrypt(confirmPassword.value));
    if (userNames) {
      formData.append('userName', select.value);
    }
    loading.show();
    let res = await smsUpdatePwd(formData).finally(() => loading.hide());
    if (res.status === 0) {
      debugger;
      sessionStorage.getItem('userNames') && sessionStorage.removeItem('userNames');
      sessionStorage.getItem('secretKey') && sessionStorage.removeItem('secretKey');
      await logout(id).catch(e => e);
      removeToken();
      debugger;
      showToLoginDialog('修改成功');
    } else {
      showDialog(res.message || '系统错误');
    }
  }
}

/**
 * @description 提示跳转弹窗
 * @param {String} bodyTxt 消息语
 * @param {String} type 类型
 */
function showToLoginDialog(bodyTxt = '') {
  let dialog = document.querySelector('.dialog');
  if (dialog) removeElement(dialog);
  const dom = document.createElement('div');
  dom.className = 'dialog';
  const bodyDom = document.querySelector('body');

  dom.innerHTML = `<div id='msgBox-mask'>
      <div id='msgBox-main'>
        <div id='msgBox-head'>提示</div>
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
    if (IS_MOBILE) {
      router.push('mobile.html');
    } else {
      router.push('login.html');
    }
    removeElement(messageBox);
  };
  setTimeout(() => {
    if (IS_MOBILE) {
      router.push('mobile.html');
    } else {
      router.push('login.html');
    }
  }, 3500);
}

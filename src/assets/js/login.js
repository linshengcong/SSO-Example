import {
  getCookie,
  removeToken,
  getQueryVariable,
  showDialog,
  setCookie,
  backToOriginalSystem,
  Router,
  Loading,
  encrypt,
  removeElement
} from '@/utils';
import { login, getUserInfo, isOpenNewWindow, logout } from '@/API';
import {
  IS_MOBILE,
  OA_ID_TEST,
  OA_ID_PRO,
  FEI_SHU_ID_TEST,
  FEI_SHU_ID_PRO,
  OA_URL_PRO,
  OA_URL_TEST,
  IS_FEI_SHU,
  SERVICE_URL_TEST,
  SERVICE_URL_PRO
} from '@/utils/constant.js';

let oaUrl = '';
let OA_ID = '';
let FEI_SHU_ID = '';
let SERVICE_URL = '';

if (process.env.APP_MODE === 'pro') {
  oaUrl = OA_URL_PRO;
  OA_ID = OA_ID_PRO;
  FEI_SHU_ID = FEI_SHU_ID_PRO;
  SERVICE_URL = SERVICE_URL_PRO;
} else {
  oaUrl = OA_URL_TEST;
  OA_ID = OA_ID_TEST;
  FEI_SHU_ID = FEI_SHU_ID_TEST;
  SERVICE_URL = SERVICE_URL_TEST;
}

const bodyDom = document.querySelector('body');
const veriCode = document.querySelector('#verificationCode');
const loginDOM = document.querySelector('#handle-login');
const userNameDOM = document.querySelector('#user-name');
const UserPwdDOM = document.querySelector('#user-pwd');
let appId = getQueryVariable('appId') || OA_ID;
const returnURL = getQueryVariable('returnUrl') || oaUrl;
const validateImg = document.querySelector('.validate-img');
const forgetPassword = document.querySelector('.forget-password');
const logoutDOM = document.querySelector('.logout');
const router = new Router();
const loading = new Loading();

window.onload = async function () {
  console.log('查看环境', process.env.APP_MODE);
  document.title = '加载中';
  redirect();
  loading.show();
  sessionStorage.getItem('secretKey') && sessionStorage.removeItem('secretKey');
  sessionStorage.getItem('userNames') && sessionStorage.removeItem('userNames');
  if (sessionStorage.getItem('token')) {
    await checkLogin();
  }
  if (!sessionStorage.getItem('token') && IS_FEI_SHU) {
    sessionStorage.setItem('appId', appId);
    sessionStorage.setItem('returnURL', returnURL);
    // TODO
    router.replace(
      `https://open.feishu.cn/open-apis/authen/v1/index?app_id=${FEI_SHU_ID}&redirect_uri=${SERVICE_URL}/api/FeishuToken`
    );
  }
  forgetPassword.onclick = function () {
    if (IS_MOBILE) {
      router.push('forgetPwdMobile.html');
    } else {
      router.push('forgetPwdPC.html');
    }
  };

  userNameDOM.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode === 13) {
      handleLogin();
    }
  };
  UserPwdDOM.onkeydown = function (event) {
    let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode === 13) {
      handleLogin();
    }
  };

  loginDOM.onclick = function () {
    handleLogin();
  };
  logoutDOM.onclick = function () {
    showLogoutDialog('确认退出？');
  };
  loading.hide();
  document.title = '统一认证';
};

/**
 *
 * @description 登录逻辑
 */
async function handleLogin() {
  const isValid = validateForm();
  if (!isValid) return;
  let password = UserPwdDOM.value;
  password = encrypt(password);
  const param = {
    userName: userNameDOM.value,
    password,
    authType: 0
  };
  let verificationInput = document.querySelector('.verification-input');
  if (verificationInput && verificationInput.value) {
    param['verCode'] = verificationInput.value;
  } else {
    delete param.verCode;
  }
  loading.show();
  const { data, status, message } = await login(appId, param).finally(() => loading.hide());
  debugger;
  if (Number(status) === 0) {
    // 登录成功
    sessionStorage.setItem('token', data.token);
    setCookie('ssotoken', data.token, {
      domain: '.linshengcong.cn',
      path: '/'
    });
    setCookie('ssotoken', data.token, {
      domain: '.linshengcong.cn',
      path: '/'
    });
    if (data.PwdStatusInfo === 1) {
      // 第一次登录
      data.secretKey && sessionStorage.setItem('secretKey', data.secretKey);
      showToChangePwdDialog('检测到您是首次登陆，请修改密码', 'first');
    } else if (data.PwdStatusInfo === 2) {
      // 密码快过期
      showConfirmDialog('密码即将过期，是否立刻修改密码？');
    } else if (data.PwdStatusInfo === 3) {
      // 密码过期
      data.secretKey && sessionStorage.setItem('secretKey', data.secretKey);
      showToChangePwdDialog('您的密码已过期，请修改密码', 'expire');
    } else {
      backToOriginalSystem();
    }
  } else {
    // 登录失败
    // 锁定
    if (data && data.PwdErrorNum >= 5) {
      showDialog(message || '账号已经锁定，请1小时后再试');
      showVeriCode();
    } else if (data && data.PwdErrorNum >= 3) {
      showDialog(message || '账号已经锁定，请1小时后再试');
      showVeriCode();
      // 显示验证码
    } else if (status === '1002') {
      showDialog(message || '验证码错误');
      showVeriCode();
      // 显示验证码
    } else {
      showDialog(message || '登录失败');
    }
    veriCode.style.display === 'block' && updateValidateCode();
  }
}

/**
 * @description 校验登录
 */
async function checkLogin() {
  loading.show();
  let res = await getUserInfo(appId);
  debugger;
  if (Number(res.status) === 0) {
    let url = returnURL;
    if (url.substr(-1, 1) === '?') {
      url = url.substring(0, url.length - 1);
    }
    url += url.indexOf('?') > -1 ? '&' : '?';
    const targetUri = url + 'token=' + sessionStorage.getItem('token');

    if (IS_FEI_SHU) {
      setCookie('ssotoken', sessionStorage.getItem('token'), {
        domain: '.linshengcong.cn',
        path: '/'
      });
      setCookie('ssotoken', sessionStorage.getItem('token'), {
        domain: '.linshengcong.cn',
        path: '/'
      });
      const boolean = await isOpenNewWindow(appId);
      console.log('是否打开新窗口 res', boolean.data);
      if (boolean.data) {
        window.open(targetUri);
        h5sdk.ready(function () {
          h5sdk.biz.navigation.close({});
        });
      } else {
        backToOriginalSystem();
      }
    } else {
      backToOriginalSystem();
    }
  } else {
    loading.hide();
    document.title = '统一认证';
    removeToken();
  }
}

/**
 * @description 校验表单
 * @returns {boolean}
 */
function validateForm() {
  if (!userNameDOM.value.trim()) {
    showDialog('用户名不能为空');
    return false;
  } else if (!UserPwdDOM.value) {
    showDialog('密码不能为空');
    return false;
  } else {
    return true;
  }
}

/**
 * @description 显示验证码
 */
function showVeriCode() {
  veriCode.style.display = 'block';
  let verificationInput = document.querySelector('.verification-input');
  console.log(verificationInput, 'dom');
  if (verificationInput) {
    verificationInput.onkeydown = function (event) {
      let keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
      if (keyCode === 13) {
        handleLogin();
      }
    };
  }
  validateImg.onclick = function () {
    // 点击更换验证码
    updateValidateCode();
  };
}

/**
 * @description 更新验证码
 */
async function updateValidateCode() {
  let t = new Date().getTime();
  let ssoUrl = '';
  // return
  if (process.env.APP_MODE === 'pro') {
    ssoUrl = 'https://linshengcong.cn';
  } else if (process.env.APP_MODE === 'test') {
    ssoUrl = 'https://linshengcong.cn';
  } else if (process.env.NODE_ENV === 'development') {
    ssoUrl = 'https://linshengcong.cn';
  }
  let url = `${ssoUrl}/api/ValidateCode/GetCharCode?t=${t}`;
  console.log(url);
  validateImg.src = url;
}

/**
 * @description 确认弹窗
 * @param {string} bodyTxt 显示的提示语
 */
function showConfirmDialog(bodyTxt = '用户名或密码错误') {
  let dialog = document.querySelector('.dialog');
  if (dialog) removeElement(dialog);
  const dom = document.createElement('div');
  dom.className = 'dialog';

  dom.innerHTML = `<div id='msgBox-mask'>
      <div id='msgBox-main'>
        <div id='msgBox-head'>提示</div>
        <div id='msgBox-body'>${bodyTxt}</div>
        <div id='msgBox-footer'>
          <div id='msgBox-cancel'>
            取消
          </div>
          <div id='msgBox-confirm'>
            确定
          </div>
        </div>
      </div>
    </div>`;

  bodyDom.appendChild(dom);
  const messageBox = document.querySelector('#msgBox-mask');
  const confirmBtn = document.querySelector('#msgBox-confirm');
  const cancelBtn = document.querySelector('#msgBox-cancel');

  confirmBtn.onclick = () => {
    removeElement(messageBox);
    if (IS_MOBILE) {
      router.push('changePwdMobile.html');
    } else {
      router.push('changePwdPC.html');
    }
  };
  cancelBtn.onclick = () => {
    removeElement(messageBox);
    backToOriginalSystem();
  };
}

/**
 * @description 退出确认框
 * @param {string} bodyTxt 显示的提示语
 */
function showLogoutDialog(bodyTxt = '用户名或密码错误') {
  let dialog = document.querySelector('.dialog');
  if (dialog) removeElement(dialog);
  const dom = document.createElement('div');
  dom.className = 'dialog';

  dom.innerHTML = `<div id='msgBox-mask'>
      <div id='msgBox-main'>
        <div id='msgBox-head'>提示</div>
        <div id='msgBox-body'>${bodyTxt}</div>
        <div id='msgBox-footer'>
          <div id='msgBox-cancel'>
            取消
          </div>
          <div id='msgBox-confirm'>
            确定
          </div>
        </div>
      </div>
    </div>`;

  bodyDom.appendChild(dom);

  const messageBox = document.querySelector('#msgBox-mask');
  const confirmBtn = document.querySelector('#msgBox-confirm');
  const cancelBtn = document.querySelector('#msgBox-cancel');

  confirmBtn.onclick = async () => {
    removeElement(messageBox);
    const token = sessionStorage.getItem('token') || getCookie('ssotoken') || localStorage.getItem('token');
    console.log('是否有Token：', token);
    if (token) {
      await logout(appId).catch(e => e);
    }
    removeToken();
    location.reload();
  };
  cancelBtn.onclick = () => {
    removeElement(messageBox);
  };
}

/**
 * @description 提示跳转弹窗
 * @param {String} bodyTxt 消息语
 * @param {String} type 类型
 */
function showToChangePwdDialog(bodyTxt = '', type) {
  let dialog = document.querySelector('.dialog');
  if (dialog) removeElement(dialog);
  const dom = document.createElement('div');
  dom.className = 'dialog';
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
    if (type === 'first' || type === 'expire') {
      if (IS_MOBILE) {
        router.push('changePwdMobile.html');
      } else {
        router.push('changePwdPC.html');
      }
    }
    removeElement(messageBox);
  };
}

function redirect() {
  let href = location.href;
  if (IS_MOBILE && href.indexOf('login.html') !== -1) {
    href = href.replace('login.html', 'mobile.html');
    location.replace(href);
  } else if (!IS_MOBILE && href.indexOf('mobile') !== -1) {
    href = href.replace('mobile', 'login');
    location.replace(href);
  }
}

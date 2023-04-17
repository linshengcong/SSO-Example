import { getQueryVariable, Router, IS_MOBILE, Loading } from '@/utils';

const token = getQueryVariable('token');
const router = new Router();
const loading = new Loading();
window.onload = function () {
  // alert('feishuPage ==========');
  loading.show();
  sessionStorage.setItem('token', token);
  // alert(token)
  setTimeout(() => {
    let url = '';
    if (IS_MOBILE) {
      url = '/mobile.html';
    } else {
      url = '/login.html';
    }
    loading.hide();
    router.replace(
      `${url}?appId=${sessionStorage.getItem('appId')}&returnUrl=${encodeURIComponent(
        sessionStorage.getItem('returnURL')
      )}`
    );
  }, 300);
};

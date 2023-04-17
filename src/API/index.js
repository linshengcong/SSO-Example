import request from '@/utils/request';

/**
 * 登录
 */
export const login = (appId, data) => {
  return new Promise((resolve) => {
    resolve({ data: { token: 'Hello Token'}, status: 0, message: 'success' })
  })
  // return request({
  //   method: 'POST',
  //   url: `/api/login/${appId}?random=${Math.random()}`,
  //   data
  // });
};

/**
 * 获取验证码
 */
export const getValidateCode = params => {
  return request({
    url: '/api/BasicUserInfo/GetAuthCode',
    params,
    responseType: 'arraybuffer'
  });
};

/**
 * 修改密码
 */
export const updatePassword = (id, data) => {
  return request({
    url: `/api/UserPwdUpdate?userId=${id}?random=${Math.random()}`,
    method: 'POST',
    data
  });
};

/**
 * 获取用户信息
 */
export const getUserInfo = appId => {
  return new Promise((resolve) => {
    resolve({ status: 0 })
  })
  // return request({
  //   url: `/api/BasicUserInfo/${appId}`,
  //   method: 'GET'
  // });
};

/**
 * 新验证码
 */
export const getCharCode = () => {
  return request({
    url: '/api/ValidateCode/GetCharCode',
    method: 'GET'
  });
};

/**
 * 是否打开新窗口
 */
export const isOpenNewWindow = appId => {
  return request({
    url: `/api/applicationsystem/IsOpenNewWindow/${appId}`,
    method: 'GET'
  });
};

/**
 * 发送短信
 */
export const sendSMS = params => {
  return request({
    url: '/api/sms/sendSMS',
    method: 'GET',
    params
  });
};

/**
 * 确定验证码
 */
export const checkSmsValidit = (mobile, code) => {
  return request({
    url: `/api/checkSmsValidityTime?mobile=${mobile}&code=${code}`,
    method: 'POST'
  });
};

/**
 * 设置新密码(废弃)
 */
// export const checkSmsUpdatePwd = ({ mobile, code, newPwd }) => {
//   return request({
//     url: `/api/checkSmsUpdatePwd?mobile=${mobile}&code=${code}&newPwd=${newPwd}`,
//     method: 'POST'
//   });
// };

/**
 * 登出
 */
export const logout = appId => {
  return request({
    url: `/api/AccessToken/${appId}`,
    method: 'DELETE'
  });
};

/**
 * 获取密钥
 */
// export const getSecret = () => {
//   return request({
//     url: '/api/ValidateCode/getEncryptionKey',
//     method: 'GET'
//   });
// };

/**
 * 通过短信验证密钥修改
 */
export const smsUpdatePwd = data => {
  return request({
    url: `/api/updatePwd`,
    method: 'POST',
    data
  });
};

/**
 * 首次登录 or 密码过期
 */
 export const firstLoginUpdatePwd = data => {
  return request({
    url: '/api/updatePwdInit',
    method: 'POST',
    data
  });
};

const INFO_KEY = 'blog-user-info'

// 从本地获取个人权证
export const getUserInfo = () => {
  const res = localStorage.getItem(INFO_KEY)
  const defaultUserInfo = { token: ''}
  return res ? JSON.parse(res) : defaultUserInfo
}

// 设置个人权证到本地
export const setUserInfo = (userInfo) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(userInfo))
}

// 从本地移除个人权证
export const removeUserInfo = () => {
  localStorage.removeItem(INFO_KEY)
}


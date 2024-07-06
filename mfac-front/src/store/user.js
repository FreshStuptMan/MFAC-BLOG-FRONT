import { setUserInfo, getUserInfo } from '@/util/storage'

const state = {
  userInfo: getUserInfo()
}
const mutations = {
  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
    setUserInfo(userInfo)
  }
}
const actions = {}
const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
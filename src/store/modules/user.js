import { login, logout } from '@/api/user'
import { setInfo, getInfo, removeInfo } from '@/utils/operaInfo'
import { getToken, setToken, removeToken} from '@/utils/auth'
import { resetRouter } from '@/router/index'

const state = {
  token: getToken(),
  name: getInfo('name'),
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  loginIn({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          const token = response.data.token
          const name = response.data.username
          // console.log(token);
          commit('SET_TOKEN', token)
          commit('SET_NAME', name)
          setInfo('name', name)
          setToken(token)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise(resolve => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        commit('SET_NAME', '')
        removeInfo('name')
        resetRouter()
        resolve()
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

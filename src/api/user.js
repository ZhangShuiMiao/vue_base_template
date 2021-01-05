import $http from '@/utils/request'
export function login(data) {
    return $http.postFormData('/login',data)
  }
  export function logout() {
    return $http.get('/logout')
  }
export function setInfo(name, value) {
    return localStorage.setItem(name, JSON.stringify(value))
  }
  export function getInfo(name) {
    return JSON.parse(localStorage.getItem(name))
  }
  export function removeInfo(name){
    return localStorage.removeItem(name)
  }
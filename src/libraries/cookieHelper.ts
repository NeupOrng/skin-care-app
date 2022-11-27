const getCookie = (name: string): string | undefined => {
  const arr = document.cookie.match(new RegExp(`(^| )${name}=([^;]*)(;|$)`))
  if (arr != null) {
    return unescape(arr[2])
  }
  return undefined
}

const setCookie = (name: string, value: string, expiredSec: number): void => {
  const d = new Date()
  d.setTime(d.getTime() + (expiredSec * 1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

const removeCookie = (name: string): void => {
  setCookie(name, '', 0)
}

export default {
  getCookie,
  setCookie,
  removeCookie
}

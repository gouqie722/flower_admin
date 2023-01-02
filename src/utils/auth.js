// import localStorage froIgetItemm 'js-cookie';

const TokenKey = 'token'
const RoleKey = 'roles'
const nameKey = 'name'
const avatarKey = 'avatar'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getRoles() {
  return localStorage.getItem(RoleKey)
}

export function setRoles(role) {
  return localStorage.setItem(RoleKey, role)
}

export function removeRoles() {
  return localStorage.removeItem(RoleKey)
}

export function getName() {
  return localStorage.getItem(nameKey)
}

export function setName(name) {
  return localStorage.setItem(nameKey, name)
}

export function removeName() {
  return localStorage.removeItem(nameKey)
}

export function getAvatar() {
  return localStorage.getItem(avatarKey)
}

export function setAvatar(avatar) {
  return localStorage.setItem(avatarKey, avatar)
}

export function removeAvatar() {
  return localStorage.removeItem(avatarKey)
}

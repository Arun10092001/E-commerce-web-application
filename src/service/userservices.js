import apiClient from '../utils/api-client'
import { jwtDecode } from 'jwt-decode'

export async function signup(user, profile) {
  const body = new FormData()
  body.append("name", user.name)
  body.append("email", user.email)
  body.append("password", user.password)
  body.append("deliveryAddress", user.deliveryAddress)
  body.append("profilePic", profile)

  const { data } = await apiClient.post("/users/signup", body)
  localStorage.setItem("token", data.token)
  return data
}

export async function login(user) {
  const { data } = await apiClient.post("/users/login", user)
  localStorage.setItem("token", data.token)
  return data
}

export function logout() {
  localStorage.removeItem("token")
}

export function getUser() {
  try {
    const jwt = localStorage.getItem("token")
    if (!jwt) return null
    const decoded = jwtDecode(jwt)
    return decoded
  } catch (error) {
    return null
  }
}
 
export function getJwt(){
    return localStorage.getItem("token")
}
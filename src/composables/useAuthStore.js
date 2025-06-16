import { computed, ref } from 'vue'

export const useAuthStore = () => {
  const isAuthenticated = ref(localStorage.getItem('auth') === 'true')

  const login = (form) => {
    const { user, password } = form
    if ((user === 'admin', password === 'admin')) {
      isAuthenticated.value = true
      localStorage.setItem('auth', 'true')
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    localStorage.removeItem('auth')
  }

  return { isAuthenticated: computed(() => isAuthenticated.value), login, logout }
}

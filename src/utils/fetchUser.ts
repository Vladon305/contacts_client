export const fetchUser = () => {
  const user = localStorage.getItem('user')
  if (user) return user !== 'undefined' ? JSON.parse(user) : localStorage.clear()
}

export default async (request) => {
  const token = localStorage.getItem('musavirToken')
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`
  }

  return request
}

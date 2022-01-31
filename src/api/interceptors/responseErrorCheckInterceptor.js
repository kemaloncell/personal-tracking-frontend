export default async (error) => {
  if (!error.response) {
    localStorage.removeItem('musavirToken')
    window.location.reload()
  }

  const {
    response: { status }
  } = error

  switch (status) {
    case 401 || 500:
      localStorage.removeItem('musavirToken')
      window.location.reload()
      break

    default:
      break
  }

  return Promise.reject(error)
}

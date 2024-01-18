const config = {
  baseUrl:
    import.meta.env.VITE_APP_BASE_URL === 'true'
      ? import.meta.env.VITE_APP_BASE_URL
      : window.location.origin + '/',
  token: null
}

export default config

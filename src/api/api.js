const defaultHeaders = {
  // Accept: 'application/json',
  'Content-Type': 'application/json'
}

async function request(method = 'GET', endpoint, data = null, options = {}) {
  const headers = {
    ...defaultHeaders,
    ...options.headers
  }

  const fetchOptions = {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
    ...options
  }

  // No incluir body en GET/HEAD
  if (method === 'GET' || method === 'HEAD') {
    delete fetchOptions.body
  }

  const response = await fetch(`${endpoint}`, fetchOptions)

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText)
  }

  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.includes('application/json')) {
    return response.json()
  }

  return response
}

const api = {
  get: (endpoint, options = {}) => request('GET', endpoint, null, options),
  post: (endpoint, data, options = {}) => request('POST', endpoint, data, options),
  put: (endpoint, data, options = {}) => request('PUT', endpoint, data, options),
  patch: (endpoint, data, options = {}) => request('PATCH', endpoint, data, options),
  delete: (endpoint, data = null, options = {}) => request('DELETE', endpoint, data, options)
}

export default api

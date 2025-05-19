const parseErrorMessage = (message) => {
  if (typeof message === 'object') {
    return 'El recurso solicitado no está disponible en este momento.'
  }
  const looksLikeJson = message.startsWith('{') && message.endsWith('}')
  if (typeof message === 'string' && !looksLikeJson) return message
  if (looksLikeJson) {
    const parseError = JSON.parse(message)
    return parseError.message
  }
}

export { parseErrorMessage }

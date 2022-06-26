interface Token {
  value: string
}

const createToken = (value: string): Token => {
  return {
    value,
  }
}

export default createToken

import { Token } from '../types/Token'

const createToken = (value: string): Token => {
  return {
    value,
  }
}

export default createToken

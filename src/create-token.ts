import { Token, ETokenType } from '../types/Token'

const createToken = (value: string): Token => {
  return {
    value,
    type: ETokenType.NUMBER,
  }
}

export default createToken

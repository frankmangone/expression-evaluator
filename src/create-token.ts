import { Token, ETokenType, EChars } from '../types/Token'

const createToken = (value: string): Token => {
  return {
    value,
    type: getTokenType(value),
  }
}

export default createToken

export const getTokenType = (value: string): ETokenType => {
  if (value === EChars.LEFT_PARENTHESIS) return ETokenType.LEFT_PARENTHESIS
  if (value === EChars.RIGHT_PARENTHESIS) return ETokenType.RIGHT_PARENTHESIS
  if (isNumber(value)) return ETokenType.NUMBER
  if (isText(value)) return ETokenType.PARAMETER
  return ETokenType.OPERATOR
}

const isNumber = (value: string): boolean => !Number.isNaN(parseInt(value))
const isText = (value: string): boolean =>
  Boolean(value.match(/^[a-z](?:_?[a-z0-9]+)*$/i))
// const isSymbol = (char: string): boolean => Boolean(char.match(/[-^()+*.\/]/))

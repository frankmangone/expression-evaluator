import { Token, EChars } from '../types/token'
import createToken from './create-token'

enum ECharType {
  SYMBOL,
  LETTER,
  NUMBER,
  EMPTY,
}

const parseExpression = (expression: string): Token[] => {
  let buffer = [expression[0]]
  const tokens: Token[] = []

  const popBuffer = () => {
    if (buffer.length > 0) tokens.push(createToken(buffer.join('')))
  }

  for (let i = 1; i < expression.length; i++) {
    // Need to check what's currently in the buffer - specifically, the *type* of what's stored there.
    const char: string = expression[i]

    // If new character is a left or right parenthesis, then pop the buffer and also add the parenthesis token
    if (char === EChars.LEFT_PARENTHESIS || char === EChars.RIGHT_PARENTHESIS) {
      popBuffer()
      tokens.push(createToken(char))
      buffer = []
      continue
    }

    const bufferTail = buffer[buffer.length - 1] // Resolves to `undefined` if buffer is empty
    const bufferTailType = getCharType(bufferTail)
    const currentSymbolType = getCharType(char)

    if (bufferTailType === currentSymbolType) {
      // Accumulating in buffer
      buffer.push(char)
      continue
    }

    // Else, move buffer content into a new symbol, and reset buffer to new symbol
    popBuffer()
    buffer = [char]
  }

  // Buffer now contains the last token
  popBuffer()

  return tokens
}

export default parseExpression

const getCharType = (char: string): ECharType => {
  if (char === undefined) return ECharType.EMPTY
  if (isNumber(char)) return ECharType.NUMBER
  if (isLetter(char)) return ECharType.LETTER
  return ECharType.SYMBOL
}

const isNumber = (char: string): boolean => !Number.isNaN(parseInt(char))
const isLetter = (char: string): boolean => Boolean(char.match(/[A-Za-z]/))
// const isSymbol = (char: string): boolean => Boolean(char.match(/[-^()+*.\/]/))

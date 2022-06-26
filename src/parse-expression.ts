enum ECharType {
  SYMBOL,
  LETTER,
  NUMBER,
  EMPTY,
}

const parseExpression = (expression: string): string[] => {
  let buffer = [expression[0]]
  const tokens = []

  for (let i = 1; i < expression.length; i++) {
    // Need to check what's currently in the buffer - specifically, the *type* of what's stored there.
    const char = expression[i]
    const bufferTail = buffer[buffer.length - 1] // Resolves to `undefined` if buffer is empty

    const bufferTailType = getCharType(bufferTail)
    const currentSymbolType = getCharType(char)

    if (bufferTailType === currentSymbolType) {
      // Accumulating in buffer
      buffer.push(char)
      continue
    }

    // Else, move buffer content into a new symbol, and reset buffer to new symbol
    tokens.push(buffer.join(''))
    buffer = [char]
  }

  // Buffer now contains the last token
  tokens.push(buffer.join(''))

  return tokens
}

export default parseExpression

const getCharType = (char: string): ECharType => {
  if (isNumber(char)) return ECharType.NUMBER
  if (isLetter(char)) return ECharType.LETTER
  return ECharType.SYMBOL
}

const isNumber = (char: string): boolean => !Number.isNaN(parseInt(char))
const isLetter = (char: string): boolean => Boolean(char.match(/[A-Za-z]/))
// const isSymbol = (char: string): boolean => Boolean(char.match(/[-^()+*.\/]/))

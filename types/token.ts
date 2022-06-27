export enum ETokenType {
  NUMBER,
  OPERATOR,
  PARAMETER,
  LEFT_PARENTHESIS,
  RIGHT_PARENTHESIS,
  FUNCTION,
}

export interface Token {
  value: string
  type: ETokenType
}

export enum EChars {
  LEFT_PARENTHESIS = '(',
  RIGHT_PARENTHESIS = ')',
}

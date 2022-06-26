import parseExpression from '../src/parse-expression'
import { ETokenType } from '../types/token'

describe('[func] parseExpression', () => {
  describe('Feature: parses very simple expressions', () => {
    it('Scenario: parses the expression: "2+p-m"', () => {
      const tokens = parseExpression('2+p-m')

      const expectedTokens = [
        { value: '2', type: ETokenType.NUMBER },
        { value: '+', type: ETokenType.OPERATOR },
        { value: 'p', type: ETokenType.PARAMETER },
        { value: '-', type: ETokenType.OPERATOR },
        { value: 'm', type: ETokenType.PARAMETER },
      ]

      // Mapped values matching
      expect(tokens.map((token) => token.value)).toEqual(
        expectedTokens.map((token) => token.value)
      )

      // Mapped types matching
      expect(tokens.map((token) => token.type)).toEqual(
        expectedTokens.map((token) => token.type)
      )
    })
  })
})

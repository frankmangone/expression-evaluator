import parseExpression from '../src/parse-expression'
import { Token, ETokenType } from '../types/token'

const assertKey = (expected: Token[], received: Token[], key: string) => {
  expect(expected.map((token) => token[key])).toEqual(
    received.map((token) => token[key])
  )
}

describe('[func] parseExpression', () => {
  describe('Feature: Correctly parses valid expressions', () => {
    //
    it('Scenario: Simple expression w/o parenthesis: "2+p-m"', () => {
      const tokens = parseExpression('2+p-m')

      const expectedTokens = [
        { value: '2', type: ETokenType.NUMBER },
        { value: '+', type: ETokenType.OPERATOR },
        { value: 'p', type: ETokenType.PARAMETER },
        { value: '-', type: ETokenType.OPERATOR },
        { value: 'm', type: ETokenType.PARAMETER },
      ]

      assertKey(expectedTokens, tokens, 'value')
      assertKey(expectedTokens, tokens, 'type')
    })

    //
    it('Scenario: Expression with parenthesis: "(2+p)*m"', () => {
      const tokens = parseExpression('(2+p)*m')

      const expectedTokens = [
        { value: '(', type: ETokenType.LEFT_PARENTHESIS },
        { value: '2', type: ETokenType.NUMBER },
        { value: '+', type: ETokenType.OPERATOR },
        { value: 'p', type: ETokenType.PARAMETER },
        { value: ')', type: ETokenType.RIGHT_PARENTHESIS },
        { value: '*', type: ETokenType.OPERATOR },
        { value: 'm', type: ETokenType.PARAMETER },
      ]

      assertKey(expectedTokens, tokens, 'value')
      assertKey(expectedTokens, tokens, 'type')
    })

    //
    it('Scenario: Params with underscores: "((2+p)/(3-m_a))"', () => {
      const tokens = parseExpression('((2+p)/(3-m_a))')

      const expectedTokens = [
        { value: '(', type: ETokenType.LEFT_PARENTHESIS },
        { value: '(', type: ETokenType.LEFT_PARENTHESIS },
        { value: '2', type: ETokenType.NUMBER },
        { value: '+', type: ETokenType.OPERATOR },
        { value: 'p', type: ETokenType.PARAMETER },
        { value: ')', type: ETokenType.RIGHT_PARENTHESIS },
        { value: '/', type: ETokenType.OPERATOR },
        { value: '(', type: ETokenType.LEFT_PARENTHESIS },
        { value: '3', type: ETokenType.NUMBER },
        { value: '-', type: ETokenType.OPERATOR },
        { value: 'm_a', type: ETokenType.PARAMETER },
        { value: ')', type: ETokenType.RIGHT_PARENTHESIS },
        { value: ')', type: ETokenType.RIGHT_PARENTHESIS },
      ]

      assertKey(expectedTokens, tokens, 'value')
      assertKey(expectedTokens, tokens, 'type')
    })
  })

  //
  describe('Feature: Fails to parse for invalid expressions', () => {
    //
    it('Scenario: Parameter starting with number (invalid): "2-1_a"', () => {
      expect(() => parseExpression('2-1_a')).toThrow()
    })

    //
    it('Scenario: Parameter starting with underscore (invalid): "_a_b+3"', () => {
      expect(() => parseExpression('_a_b+3')).toThrow()
    })
  })
})

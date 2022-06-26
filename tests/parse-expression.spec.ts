import parseExpression from '../src/parse-expression'

describe('[func] parseExpression', () => {
  describe('Feature: parses very simple expressions', () => {
    it('Scenario: parses the expression: "2+p-m"', () => {
      const tokens = parseExpression('2+p-m')
      expect(tokens).toEqual(['2', '+', 'p', '-', 'm'])
    })
  })
})

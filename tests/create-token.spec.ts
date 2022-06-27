import createToken from '../src/create-token'

describe('[func] createToken', () => {
  describe('Feature: creates tokens for valid inputs', () => {
    it('Scenario: works', () => {
      const token = createToken('2')
      expect(token.value).toEqual('2')
    })
  })
})

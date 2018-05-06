import { assert } from 'chai'
import { parse } from './index'

describe('parse', () => {
    it('test', () => {
        return parse().then((word: string) => {
            assert.equal(word, 'hello')
        })
    })
})
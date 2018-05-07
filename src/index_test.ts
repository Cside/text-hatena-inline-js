import { assert } from 'chai'
import textHatenaInline from './index'

describe('textHatenaInline', () => {
    it('parse', () => {
        const input = "[http://cside.me/]"
        const expects = '<a href="http://cside.me/">http://cside.me/</a>'

        return textHatenaInline.parse(input).then((result: string) => {
            assert.equal(result, expects)
        })
    })
})
import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { assert } from 'chai'
import LinkReplacer from './link'

type testCase = {
    name: string,
    input: string,
    expects: string,
}

describe('LinkReplacer', () => {
    const replacer = new LinkReplacer({ axios: Axios })

    const mock = new MockAdapter(Axios)
    mock.onGet('http://cside.me/').reply(200, '<title>Title</title>')
    mock.onGet('http://cside.me/2').reply(200, '<title>Title2</title>')

    const testCases: testCase[] = [
        {
            name: "url only",
            input: "[http://cside.me/]",
            expects: '<a href="http://cside.me/">http://cside.me/</a>',
        },
        {
            name: "fetch title",
            input: "[http://cside.me/:title]",
            expects: '<a href="http://cside.me/">Title</a>',
        },
        {
            name: "specify title",
            input: "[http://cside.me/:title=This is title]",
            expects: '<a href="http://cside.me/">This is title</a>',
        },
        {
            name: "multiple",
            input: `
                    [http://cside.me/]
                    [http://cside.me/:title]
                    [http://cside.me/:title=This is title]`,
            expects: `
                    <a href="http://cside.me/">http://cside.me/</a>
                    <a href="http://cside.me/">Title</a>
                    <a href="http://cside.me/">This is title</a>`,
        },
        {
            name: "multiple fetch",
            input: `
                    [http://cside.me/:title]
                    [http://cside.me/2:title]`,
            expects: `
                    <a href="http://cside.me/">Title</a>
                    <a href="http://cside.me/2">Title2</a>`,
        },
    ]
    testCases.forEach(t => {
        it(t.name, () => {
            return replacer.replace(t.input).then(result => {
                assert.equal(result, t.expects)
            })
        })
    })
})
import Axios, { AxiosInstance } from 'axios'
import { setupCache } from 'axios-cache-adapter'
import * as localforage from 'localforage'

const makeATag = (url: string, title: string): string => {
    // TODO: HTML Escape ...
    return `<a href="${url}">${title}</a>`
}

const cache = setupCache({
    maxage: 1 * 60 * 60 * 1000, // 1h
    store: localforage,
})

type match = {
    origString: string,
    url: string,
    needsTitle: boolean,
    title: string | undefined,
}

export default class LinkReplacer {
    axios: AxiosInstance
    constructor(args: { axios?: AxiosInstance }) {
        this.axios = args.axios || Axios.create({
            timeout: 5000,
            adapter: cache.adapter,
        })
    }
    replace = (text: string): Promise<string> => {
        const matches: match[] = []

        // 最後無駄な判定をしているので、while + RegExp.exec で置き換えたい気がしないでもない
        text.replace(/\[(https?:\/\/.+?)(:title)?(?:=(.+?))?\]/g, (origString: string, ...args: any[]): string => {
            matches.push({
                origString,
                url: args[0],
                needsTitle: !!args[1],
                title: args[2],
            })
            return origString
        })

        return Promise.all(
            matches.map((match: match): Promise<void> => {
                if (match.needsTitle && match.title) {
                    text = text.replace(match.origString, makeATag(match.url, match.title))
                    return Promise.resolve()

                } else if (match.needsTitle) {
                    return this.axios.get(match.url).then((res) => {
                        const m = res.data.match(/<title>(.+?)<\/title>/i)
                        text = text.replace(match.origString, makeATag(match.url, m ? m[1] : 'no title'))
                        return
                    })

                } else {
                    text = text.replace(match.origString, makeATag(match.url, match.url))
                    return Promise.resolve()
                }

            })
        ).then(() => { return text })
    }
}

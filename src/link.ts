import axios from 'axios'

const makeATag = (url: string, title: string): string => {
    // TODO: HTML Escape ...
    return `<a href="${url}">${title}</a>`
}

type match = {
    origString: string,
    url: string,
    needsTitle: boolean,
    title: string | undefined,
}

export const replaceLink = (text: string): Promise<void> => {
    const matches: match[] = []

    text.replace(/\[(https?:\/\/.+?)(:title)?(=.+?)?\]/g, (origString: string, args: any[]): string => {
        matches.push({
            origString,
            url: args[0],
            needsTitle: args[1],
            title: args[2],
        })
        return origString
    })

    return Promise.all(
        matches.map((match): Promise<void> => {
            if (match.needsTitle && match.title) {
                text.replace(match.origString, makeATag(match.url, match.title))
                return Promise.resolve()

            } else if (match.needsTitle) {
                // TODO timeout
                return axios.get(match.url).then((res) => {
                    const m = res.data.match(/<title>(.+?)<\/title>/i)
                    text.replace(match.origString, makeATag(match.url, m ? m[1] : ''))
                    return
                })

            } else {
                text.replace(match.origString, makeATag(match.url, match.url))
                return Promise.resolve()
            }

        })
    ).then(() => { })
}
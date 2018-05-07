import LinkReplacer from './link'

const linkReplacer = new LinkReplacer()

export default {
    parse: (text: string): Promise<string> => {
        return linkReplacer.replace(text)
    },
}
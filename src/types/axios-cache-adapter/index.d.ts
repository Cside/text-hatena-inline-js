import { AxiosAdapter } from 'axios'

type Store = LocalForage

type Config = {
    store?: Store,
    maxage?: number,
    debug?: boolean,
}
type Cache = {
    store: Store,
    config: Config,
    adapter: AxiosAdapter,
}

export function setupCache(config: Config): Cache
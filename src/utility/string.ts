// @ts-ignore
const { S } = window.sanctuary

const parseMarkup = (markup: string): Document => new window.DOMParser().parseFromString(markup, "text/html")
const fieldValuePair = ([k, v]: any[]): string => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`
const joinWith = (x: string) => (ys: string[]): string => ys.join(x)
const queryString = S.pipe([S.pairs, S.map(fieldValuePair), joinWith("&")])

export { queryString, parseMarkup }

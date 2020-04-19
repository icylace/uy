// https://hyperapp.slack.com/archives/C41ECC0V6/p1585968409442100?thread_ts=1585960553.440600&cid=C41ECC0V6

declare module "hyperapp" {
  interface AppParams<S> {
    init: S,
    view: (state: S) => any,
    node: Element,
    subscriptions?: (state: S) => [any],
    // [property: string]: any,
  }
  export function app<S>(init: AppParams<S>): undefined
  interface Attrs {
    [property: string]: any
  }
  export function h(
    tag: string,
    attrs: Attrs,
    ...children: any[]): any
}

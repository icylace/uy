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



  // // TODO:

  // export type Child = VNode | string | number | null


  // export interface VNode<Attributes = {}> {
  //   children: (VNode | string)[];
  //   key?: string | number | null;
  //   name: string;
  //   node?: object;
  //   props: Attributes;
  //   type?: number;
  // }


  // Type.VNode = Nullary
  //   ("https://github.com/jorgebucaran/hyperapp/blob/cf6c7451473ae49647526c3781338a6ab39cfc7f/src/index.js#L373")
  //   ([])
  //   (x =>
  //     x == null ||
  //     typeof x === "number" ||
  //     typeof x === "string" ||
  //     (typeof x === "object" && having({
  //       children: requiredArray,
  //       key: optionalString,
  //       name: requiredString,
  //       node: optionalObject,
  //       props: requiredObject,
  //       type: optionalNumber,
  //     })(x))
  //   )




}

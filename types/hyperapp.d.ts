// Type definitions for Hyperapp 2.0.4
// Project: https://hyperapp.dev/
// Definitions by: Ron Martinez <https://ramartin.net/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "hyperapp" {
  // A Hyperapp application instance has an initial state and a base view.
  // It must also be mounted over an available DOM element.
  type App<S, P, D> = {
    init: Dispatch<S, P, D>;
    view: View;
    node: Node;
    subscriptions?: Subscription;
    middleware?: Middleware;
  }

  // A view builds a virtual node representation of the application state.
  type View = <S>(state: State<S>) => VDOM

  // Application state is made available to every view and action.
  type State<S> = S

  // -----------------------------------------------------------------------------

  // A virtual DOM node represents an actual DOM element.
  type VDOM = {
    name: string;
    node?: Node;
    props: PropList;
    children: VDOM[];
    type?: VDOMType;
    key?: string;
    lazy?: LazyVDOMProps;
  }

  // Virtual DOM nodes are distinguished by their types to assist rendering.
  const enum VDOMType {
    Recycled = 1,
    Lazy = 2,
    Text = 3,
  }

  // A lazy virtual DOM node stores a view along with properties available to it.
  type LazyVDOM = Partial<VDOM>
  type LazyVDOMProps = PropList & { view: LazyView }

  // A lazy view builds a virtual DOM node out of a lazy virtual DOM node.
  type LazyView = (state: LazyVDOMProps) => VDOM

  // Virtual DOM properties will often correspond to HTML attributes.
  type PropList = Record<string, Prop> & ElementCreationOptions
  type Prop = string | number | boolean | null | Function | ClassProp | StyleProp | Prop[]

  // The `class` property represents an HTML class attribute string.
  type ClassProp = string | Record<string, boolean> | ClassProp[]

  // The `style` property represents inline CSS.
  type StyleProp = Record<string, string | number>

  // -----------------------------------------------------------------------------

  // A dispatch is a response to an event within the context of the current state.
  type Dispatch<S, P, D>
    // Direct usage of an action is a common type of response.
    = Action
    // An action can be setup to use a payload or a modified payload.
    | [Action, Payload<P>]
    | [Action, PayloadCreator]
    // Dispatches can be nested to allow for payload modification to be chained.
    | [Dispatch<S, P, D>[], Payload<P>]
    | [Dispatch<S, P, D>[], PayloadCreator]
    // State can be set directly along with any effects to be run. This is useful
    // when setting the initial state.
    | Reaction<S, D>

  // An action is what's used to transform existing state.
  type Action = <S, P, D>(state: State<S>, props?: Payload<P>) => Reaction<S, D>

  // An action can accept data in addition to the current state.
  type Payload<P> = P

  // A payload creator can customize the default payload for an action.
  type PayloadCreator = <P>(props: Payload<P>) => Payload<P>

  // A reaction represents a state transformation that may cause effects.
  // A "chain reaction" is a series of successive dispatched actions.
  type Reaction<S, D> = State<S> | [State<S>, ...EffectDescriptor<D>[]]

  // An effect descriptor describes how Hyperapp should invoke an effect.
  // A function that creates them is called an effect constructor.
  type EffectDescriptor<D> = [Effect, EffectData<D>]

  // An effect is where side effects and any additional dispatching occur.
  type Effect = <S, P, D>(dispatch: Dispatch<S, P, D>, props: EffectData<D>) => void

  // Effects generally need to operate on some sort of data.
  type EffectData<D> = D

  // -----------------------------------------------------------------------------

  // A subscription is a recurring dispatch that provides a way to remove itself.
  // Multiple subscriptions can be active simultaneously.
  type Subscription = <S>(state: State<S>) => (() => void) | Subscription[]

  // -----------------------------------------------------------------------------

  // Middleware allows for custom processing during dispatching.
  type Middleware = <S>(state: State<S>) => State<S>

  // -----------------------------------------------------------------------------

  // The `app` function along with effects should be the only places in a Hyperapp
  // application that you need to worry about side effects.
  function app<S, P, D>(props: App<S, P, D>): void

  // The `h` function builds a virtual DOM node.
  function h(name: string | CustomVDOMConstructor, props?: VNodePropList, ...rest: VNode[]): VDOM

  // A virtual node is a convenience layer over a virtual DOM node.
  type VNode = string | number | boolean | null | VDOM | VNodePropList | VNode[]
  type VNodePropList = Record<string, Prop> & { key?: string }

  // The `h` function allows customized virtual DOM node construction. Hyperapp's
  // own `Lazy` constructor is an example of this.
  type CustomVDOMConstructor = (props: VNodePropList, children: VNode) => VDOM

  // The `Lazy` function is a way of deferring the rendering of virtual DOM nodes.
  function Lazy(props: LazyVDOMProps): LazyVDOM
}

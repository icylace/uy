// Type definitions for Hyperapp 2.0.4
// Project: https://hyperapp.dev/
// Definitions by: Ron Martinez <https://ramartin.net/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module "hyperapp" {
// A Hyperapp application instance has an initial state and a base view.
// It must also be mounted over an available DOM element.
type App<I> = {
  init: I;
  view: View;
  node: Node;
  subscriptions?: Subscriptions;
  middleware?: Middleware;
}

// A view builds a virtual node representation of the application state.
type View = (state: State) => VDOM

// Application state is made available to every view and action.
type State = any

// A virtual DOM node represents a DOM element.
type VDOM = {
  name: string;
  node?: Node;
  props: VDOMProps;
  children: VDOM[];
  type?: VDOMType;
  key?: string;
  lazy?: LazyVDOMProps;
}

// TODO:
// type LazyVDOM = Partial<VDOM>

// Virtual DOM nodes are distinguished by their types to assist rendering.
const enum VDOMType {
  Recycled = 1,
  Lazy = 2,
  Text = 3,
}

// Virtual DOM properties will often correspond to HTML attributes.
type VDOMProps = Record<string, any> & ElementCreationOptions

// A lazy virtual DOM node stores a view along with properties available to it.
type LazyVDOMProps = VDOMProps & { view: LazyView }

// TODO:
// A lazy view builds a virtual DOM node out of a lazy virtual DOM node.
type LazyView = (state: LazyVDOMProps | undefined) => VDOM

// -----------------------------------------------------------------------------

// A dispatch is a response to an event within the context of the current state.
type Dispatch
  // A action is a standard type of response.
  = Action
  // An action can be setup to use a payload or a modified payload.
  | [Action, Payload]
  | [Action, PayloadCreator]
  // Dispatches can be nested to allow for payload modification to be chained.
  | [Dispatch[], Payload]
  | [Dispatch[], PayloadCreator]
  // State can be set directly along with any effects to be run. This is useful
  // when setting the initial state.
  | State
  | [State, ...EffectDescriptor<any>[]]

/* *
// TODO:
dispatch f()                    props -> state = f state props
dispatch [f(), g]               props -> dispatch f g
dispatch [f(), g()]             props -> dispatch f (g props)
dispatch [[...], g]             props -> dispatch [...] g
dispatch [[...], g()]           props -> dispatch [...] (g props)
dispatch [s, ...[fx(), g]@fxs]  props -> state = s ; map (\fx -> fx && (fx[0] dispatch fx[1])) $ batch fxs
dispatch f                      props -> state = f
/* */

// An action is what's used to transform existing state.
type Action = (state: State, props?: Payload) => Reaction<any>

// An action can accept data in addition to the current state.
type Payload = any

// A payload creator can customize the default payload for an action.
type PayloadCreator = (props: Payload) => Payload

// A reaction represents a state transformation that may cause an effect.
// A "chain reaction" is a series of successive dispatched actions.
type Reaction<D> = State | [State, EffectDescriptor<D>]

// An effect descriptor describes how Hyperapp should invoke an effect.
type EffectDescriptor<D> = [Effect, EffectData<D>]

// An effect is where side effects and any additional dispatching occur.
type Effect = <D>(dispatch: Dispatch, props: EffectData<D>) => void

// Effects generally need to operate on some sort of data.
type EffectData<D> = D

// -----------------------------------------------------------------------------

// TODO:
type Subscription = (state: State) => any
type SubscriptionList = (state: State) => Subscription[]
type Subscriptions = Subscription | SubscriptionList

// -----------------------------------------------------------------------------

// Middleware allows for custom processing during dispatching.
type Middleware = (state: State) => State

// -----------------------------------------------------------------------------

// The `app` function along with effects should be the only places in a Hyperapp
  // application that you need to worry about side effects.
  function app<I>(props: App<I>): void

  // The `h` function builds a virtual node.
  function h(name: string | CustomVNodeConstructor, props?: any, ...rest: (VNode | VNode[])[]): VDOM

  // A virtual node is a convenience layer over a virtual DOM node.
  type VNode = VDOM | string | number | boolean | null

  // The `h` function provides a way to do customized virtual node construction.
  // Hyperapp's own `Lazy` constructor is an example of this.
  type CustomVNodeConstructor = (props: any, children: VNode[]) => VDOM

  // The `Lazy` function is a way of deferring the rendering of virtual nodes.
  function Lazy(props: VDOMProps): any
}

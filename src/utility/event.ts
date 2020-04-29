// Based on:
// https://github.com/jorgebucaran/hyperapp/issues/752#issue-355556484
const eventFx = (name: string): Function => {
  return ((fx: any) => (action: any): any => [fx, { action }]) ((dispatch: any, props: any) => {
    const listener = (event: any): any => dispatch (props.action, event)
    window.addEventListener (name, listener)
    return (): any => window.removeEventListener (name, listener)
  })
}

const onClick = eventFx ("click")
const onMouseDown = eventFx ("mousedown")

const handleValueWith = (f: Function): any => (state: any, event: any): any => {
  return f (state, event.target.value)
}

// Invokes a collection of event handlers with the same event.
const handleUsing = (handlers: any[]) => (state: any, event: any): any => {
  return handlers.reduce ((newState: any, f: Function): any => f (newState, event), state)
}

// -----------------------------------------------------------------------------

// Invokes an action when an event occurs outside of a certain element.
//
// Based on:
// https://stackoverflow.com/a/28432139
// https://codesandbox.io/s/czee7
//
const onOutside = (selector: string) => (outsideAction: Function) => (state: any, event: any): any => {
  const el = document.querySelector (selector)
  if (!el || el.contains (event.target)) return state
  return outsideAction (event) (state)
}

export {
  eventFx,
  handleUsing,
  handleValueWith,
  onClick,
  onMouseDown,
  onOutside,
}

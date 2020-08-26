import type { Payload, State, VDOM, VNode, View } from "hyperapp"

export type ContainerView = (_: View[]) => View
export type Content = string | string[] | VNode | VNode[]
export type Control = (_: ControlOptions) => (_: Path) => <S>(_: State<S>) => VDOM
export type Path = string[]
export type Renderer = (_: VNode[]) => VDOM

// -----------------------------------------------------------------------------

// TODO:
export type Handler = <S, P>(state: State<S>, payload?: Payload<P>) => State<S>

// -----------------------------------------------------------------------------

export type ControlData<T> = {
  [_: string]: unknown
  value: T
}

export type ListData<T> = {
  items: T
}

export type SearchboxData = ControlData<string> & {
  focused: boolean
  searching: boolean
  results: string[]
}

// -----------------------------------------------------------------------------

export type ComponentOptions = {
  [_: string]: unknown
  disabled: boolean
  locked: boolean
}

export type ControlOptions = ComponentOptions & {
  update: Handler
}

export type LabelledComponentOptions = ComponentOptions & {
  label?: Content
}

export type LabelledControlOptions = ControlOptions & LabelledComponentOptions

// -----------------------------------------------------------------------------

export type PopupOptions = ComponentOptions & {
  id: string
}

// -----------------------------------------------------------------------------

export type ChecklistOptions = ComponentOptions & {
  path: Path
  render: (_: any) => VDOM
}

export type DropdownOptions = ControlOptions & {
  options: any
  path: Path
}

export type ListOptions = ControlOptions & {
  headers: any
  path: any
}

export type MultiselectOptions = ControlOptions & {
  options: Record<string, any>
  usingColumnMode: boolean
}

export type NumberboxOptions = ControlOptions & LabelledComponentOptions

export type PagerOptions = ControlOptions & {
  itemsPerPage: number
  pageRange: number
}

export type RadiosOptions = ControlOptions & {
  options: Record<string, any>
}

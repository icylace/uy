import { State, VDOM, VNode, View } from "hyperapp"

export type ContainerView = (_: View[]) => View
export type Control = (_: ControlOptions) => (_: Path) => <S>(_: State<S>) => VDOM
export type Path = string[]
export type Renderer = (_: VNode) => VDOM

// -----------------------------------------------------------------------------

export type ControlData<T> = {
  [_: string]: any;
  value: T;
}

export type ListData<T> = {
  items: T;
}

export type SearchboxData = ControlData<string> & {
  focused: false;
  searching: false;
  results: [];
}

export type TableData = {
  rows: any[];
}

// -----------------------------------------------------------------------------

export type ComponentOptions = {
  [_: string]: any;
  disabled: boolean;
  locked: boolean;
}

export type ControlOptions = ComponentOptions & {
  update: Function;
}

export type LabelledComponentOptions = ComponentOptions & {
  label?: number | string | VDOM;
}

export type LabelledControlOptions = ControlOptions & LabelledComponentOptions

// -----------------------------------------------------------------------------

export type PopupOptions = ComponentOptions & {
  id: string;
}

export type TableOptions = ComponentOptions & {
  headers: any[] | any;
  orderColumn: string | null;
  sortDescending: boolean;
}

// -----------------------------------------------------------------------------

export type ChecklistOptions = ComponentOptions & {
  path: Path;
  render: (_: any) => VDOM;
}

export type DropdownOptions = ControlOptions & {
  options: any;
  path: Path;
}

export type ListOptions = ControlOptions & {
  headers: any;
  path: any;
}

export type MultiselectOptions = ControlOptions & {
  options: Record<string, any>;
  usingColumnMode: boolean;
}

export type NumberboxOptions = ControlOptions & LabelledComponentOptions

export type PagerOptions = ControlOptions & {
  itemsPerPage: any;
  pageRange: any;
}

export type RadiosOptions = ControlOptions & {
  options: Record<string, any>;
}

export type TabsOptions = ControlOptions & {
  itemsFooter: any;
  itemsHeader: any;
  tabList: any;
}

import { VDOM } from "hyperapp"

export type Path = string[]

// -----------------------------------------------------------------------------

export type ControlData<T> = {
  [k: string]: any;
  value: T;
}

export type SearchboxData = ControlData<string> & {
  focused: false;
  searching: false;
  results: [];
}

// -----------------------------------------------------------------------------

export type ComponentOptions = {
  [k: string]: any;
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

export type MultiselectOptions = ControlOptions & {
  options: Record<string, any>;
  usingColumnMode: boolean;
}

export type PagerOptions = ControlOptions & {
  itemsPerPage: any;
  pageRange: any;
}

export type RadiosOptions = ControlOptions & {
  options: any;
}

export type TabsOptions = ControlOptions & {
  itemsFooter: any;
  itemsHeader: any;
  tabList: any;
}

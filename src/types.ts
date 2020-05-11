export type ComponentOptions = {
  [k: string]: any;
  disabled: boolean;
  locked: boolean;
}

export type ControlOptions = ComponentOptions & {
  update: Function;
}

export type LabelledComponentOptions = ComponentOptions & {
  label?: string;
}

export type PopupOptions = ComponentOptions & {
  id: string;
}

export type TableOptions = ComponentOptions & {
  headers: any[] | any;
  orderColumn: string | null;
  sortDescending: boolean;
}

export type Path = string[]

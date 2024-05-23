export interface TodoModel {
  id: number;
  title: string;
  text: string;
  completed: boolean;
  editing?: boolean;
}

export type FilterType = "all" | "active" | "completed"

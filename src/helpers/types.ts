export interface Todo {
  id: number | string;
  name: string;
  completed: boolean;
}

export interface TodosState {
  todos: Todo[];
  toggleEdit: boolean;
  todoToEdit: Todo | Record<string, never>;
}

import { Todo, TodoBackend } from "../models/Todo";

export class TodoFactory extends Todo {
  constructor(data: TodoBackend, type: string) {
    super(data);
    if (type === "APIv1") {
      return new Todo(data);
    }
  }
}

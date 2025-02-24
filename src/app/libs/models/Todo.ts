export interface TodoBackend {
  id: string;
  title: string;
  rank: number;
  is_completed: boolean;
}

export class Todo {
  _id: string;
  _title: string;
  _rank: number;
  _isCompleted: boolean;

  constructor(data: TodoBackend) {
    this._id = data.id;
    this._title = data.title;
    this._rank = data.rank;
    this._isCompleted = data.is_completed;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get rank() {
    return this._rank;
  }

  get isCompleted() {
    return this._isCompleted;
  }
}

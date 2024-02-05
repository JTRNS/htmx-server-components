const kv = await Deno.openKv();

export interface Todo {
  id: string;
  title: string;
  done: boolean;
}

export const todoStore = {
  async getAll(): Promise<Todo[]> {
    const iter = kv.list<Todo>({prefix: ['todo']});
    const todos: Todo[] = [];
    for await (const todo of iter) {
      todos.push(todo.value);
    }
    return todos;
  },

  async get(id: string): Promise<Todo | null> {
    const {value} = await kv.get<Todo>(['todo', id]);
    return value;
  },

  async create(title: Todo['title']): Promise<Todo> {
    const id = crypto.randomUUID().slice(0, 8);
    const todo = {id, title, done: false};
    await kv.set(['todo', id], todo);
    return todo;
  },

  async update(id: string, changes: Omit<Todo, 'id'>): Promise<Todo> {
    const updated = {id: id, ...changes};
    await kv.set(['todo', id], updated);
    return updated;
  },

  async delete(id: string): Promise<void> {
    await kv.delete(['todo', id]);
  },

  async clear(): Promise<void> {
    const iter = kv.list<Todo>({prefix: ['todo']});
    for await (const {key} of iter) {
      await kv.delete(key);
    }
  },
};

import type { Todo } from "./todo_store.ts";

export function TodoIndex({ todos }: { todos: Todo[] }) {
  return (
    <main>
      <Create />
      <List todos={todos} />
    </main>
  );
}

export function List({ todos }: { todos: Todo[] }) {
  return (
    <ul
      id="todolist"
      // I feel dirty.
      hx-on--after-swap="event.detail.elt['0']?.select();"
    >
      {todos.map((todo) => (
        <li>
          <ListItem key={todo.id} todo={todo} />
        </li>
      ))}
    </ul>
  );
}

export function Create() {
  return (
    <form
      className="todo-item"
      hx-post={"/todos"}
      hx-target="#todolist"
      hx-swap="beforeend"
      hx-on--after-request="this.reset()"
    >
      <input type="text" name="title" required />
      <button type="submit">Add</button>
    </form>
  );
}

export function NewListItem({ todo }: { todo: Todo }) {
  return (
    <li>
      <ListItem todo={todo} />
    </li>
  );
}

export function ListItem({ todo }: { todo: Todo }) {
  return (
    <div className="todo-item" hx-target="this" hx-swap="outerHTML">
      <label>
        <input
          name={todo.id}
          type="checkbox"
          checked={todo.done}
          hx-put={`/todos/${todo.id}`}
        />
        {todo.title}
      </label>
      <button id={todo.id} hx-patch={`/todos/${todo.id}`}>
        📝
      </button>
      <button hx-target="closest li" hx-delete={`/todos/${todo.id}`}>
        🗑️
      </button>
    </div>
  );
}

export function EditableItem({ todo }: { todo: Todo }) {
  return (
    <form
      className="todo-item"
      action={`/todos/${todo.id}`}
      method="post"
      hx-post={`/todos/${todo.id}`}
      hx-target="this"
      hx-swap="outerHTML"
    >
      <input
        type="text"
        name="title"
        value={todo.title}
        id={todo.id}
        required
      />
      <button type="submit">✅</button>
      <button type="reset" hx-get={`/todos/${todo.id}`}>
        ❌
      </button>
    </form>
  );
}

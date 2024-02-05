import { serveDir } from "$std/http/file_server.ts";
import { render } from "preact-render-to-string";
import TodoView from "./todo_view.tsx";
import { type Todo, todoStore } from "./todo_store.ts";

const pattern = new URLPattern({ pathname: "/todos/:id?" });

Deno.serve(async (req: Request) => {
  const match = pattern.exec(req.url);
  if (match === null) {
    return await serveDir(req, {
      fsRoot: "public",
    });
  }
  const { id } = match.pathname.groups;
  if (id !== undefined && id !== "") {
    const todo = await todoStore.get(id);
    return !todo
      ? new Response(null, { status: 404 })
      : handleTodoRequest(req, todo);
  }
  return handleTodoListRequest(req);
});

async function handleTodoRequest(req: Request, todo: Todo) {
  let formData;
  switch (req.method) {
    case "GET":
      return html(<TodoView.ListItem todo={todo} />);
    case "PUT":
      formData = await req.formData();
      todo.done = formData.get(todo.id) === "on";
      await todoStore.update(todo.id, todo);
      return html(<TodoView.ListItem todo={todo} />);
    case "POST":
      formData = await req.formData();
      todo.title = formData.get("title")?.toString() ?? todo.title;
      await todoStore.update(todo.id, todo);
      return html(<TodoView.ListItem todo={todo} />);
    case "PATCH":
      return html(<TodoView.EditableItem todo={todo} />);
    case "DELETE":
      await todoStore.delete(todo.id);
      return new Response(null, { status: 200 });
    default:
      return new Response(null, { status: 405 });
  }
}

async function handleTodoListRequest(req: Request) {
  switch (req.method) {
    case "GET": {
      const todos = await todoStore.getAll();
      return html(<TodoView todos={todos} />);
    }
    case "POST": {
      const formData = await req.formData();
      const title = formData.get("title")?.toString() ?? "new todo";
      const todo = await todoStore.create(title);
      return html(
        <li>
          <TodoView.ListItem todo={todo} />
        </li>,
      );
    }
    default:
      return new Response(null, { status: 405 });
  }
}

function html(...args: Parameters<typeof render>) {
  return new Response(render(...args), {
    headers: { "Content-Type": "text/html" },
  });
}

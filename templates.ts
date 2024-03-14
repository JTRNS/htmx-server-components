import type { VNode } from "preact";
import { renderToString } from "preact-render-to-string";
import * as todoViews from "./todo_view.tsx";

// deno-lint-ignore no-explicit-any
export type Template = Record<string, (...args: any[]) => VNode>;

export type TemplateResponse<T extends Template> = <K extends keyof T>(
  key: K,
  ...args: Parameters<T[K]>
) => Response;

export function createTemplate<T extends Template>(
  template: T,
): TemplateResponse<T> {
  return (key, ...args) => {
    return new Response(renderToString(template[key](...args)), {
      headers: { "Content-Type": "text/html" },
    });
  };
}

export const TodoView = createTemplate(todoViews);

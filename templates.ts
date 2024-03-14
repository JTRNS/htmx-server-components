import type { VNode } from "preact";
import { renderToString } from "preact-render-to-string";

// deno-lint-ignore no-explicit-any
export type Template = Record<string, (...args: any[]) => VNode>;

export type TemplateResponse<T extends Template> = <K extends keyof T>(
  resp: ResponseInit | number,
  key: K,
  ...args: Parameters<T[K]>
) => Response;

export function createTemplate<T extends Template>(
  template: T,
): TemplateResponse<T> {
  return (resp, key, ...args) => {
    if (typeof resp === "number") {
      resp = {
        status: resp,
        headers: {
          "Content-Type": "text/html",
        },
      };
    }

    if ("headers" in resp) {
      resp.headers = new Headers(resp.headers);
      resp.headers.set("Content-Type", "text/html");
    }

    return new Response(renderToString(template[key](...args)), {
      ...resp,
    });
  };
}

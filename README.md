# HTMX Server Components

Craft blazing-fast hypertext applications by infusing type-safe, server rendered components with the power of HTMX.

This demo leverages [Deno's precompile](https://deno.com/blog/v1.38#fastest-jsx-transform) feature, a JSX transform optimized for server-side rendering, and [`preact-render-to-string`](https://github.com/preactjs/preact-render-to-string) to render JSX components into HTMX snippets.

## Goals

- Learn how to configure Deno for fast server-side rendering of components.
- Figure out how to augument JSX type definitions for "type-safe" / autocompletion of HTMX-related attributes.
- Postpone the inevitable resurgence of PHP a little longer.

## Non-Goals

- Live up to expectations set by the repository's name.

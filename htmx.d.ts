import "typed-htmx";

// Adds types for autocompletion of HTMX attributes in JSX
declare global {
  namespace preact.JSX {
    // deno-lint-ignore no-empty-interface
    interface HTMLAttributes extends HtmxAttributes {}
  }
}

type HtmxRequestHeader = {
  /** indicates that the request is via an element using hx-boost */
  "HX-Boosted"?: string;
  /** the current URL of the browser */
  "HX-Current-URL"?: string;
  /** “true” if the request is for history restoration after a miss in the local history cache */
  "HX-History-Restore-Request"?: string;
  /** the user response to an hx-prompt */
  "HX-Prompt"?: string;
  /** always “true” for requests by HTMX library */
  "HX-Request"?: string;
  /** the id of the target element if it exists */
  "HX-Target"?: string;
  /** the name of the triggered element if it exists */
  "HX-Trigger-Name"?: string;
  /** the id of the triggered element if it exists */
  "HX-Trigger"?: string;
};

type HtmxResponseHeader = {
  /** allows you to do a client-side redirect that does not do a full page reload */
  "HX-Location"?: string;
  /** pushes a new url into the history stack */
  "HX-Push-Url"?: string;
  /** can be used to do a client-side redirect to a new location */
  "HX-Redirect"?: string;
  /** if set to “true” the client-side will do a full refresh of the page */
  "HX-Refresh"?: string;
  /** replaces the current URL in the location bar */
  "HX-Replace-Url"?: string;
  /** allows you to specify how the response will be swapped. See hx-swap for possible values */
  "HX-Reswap"?: string;
  /** a CSS selector that updates the target of the content update to a different element on the page */
  "HX-Retarget"?: string;
  /** a CSS selector that allows you to choose which part of the response is used to be swapped in. Overrides an existing hx-select on the triggering element */
  "HX-Reselect"?: string;
  /** allows you to trigger client-side events */
  "HX-Trigger"?: string;
  /** allows you to trigger client-side events after the settle step */
  "HX-Trigger-After-Settle"?: string;
  /** allows you to trigger client-side events after the swap step */
  "HX-Trigger-After-Swap"?: string;
};

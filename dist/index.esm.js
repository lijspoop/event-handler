var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/index.ts
function defineHandler(handler) {
  handler.init?.();
  if ("events" in handler && Array.isArray(handler.events)) {
    handlerEvents(handler.events);
  }
  function handlerEvents(events, parentEvent = void 0) {
    events?.forEach((scriptEvent) => {
      if (parentEvent !== void 0) {
        scriptEvent.parentEvent = parentEvent;
      }
      if (Array.isArray(scriptEvent.type)) {
        scriptEvent.type.forEach(
          (type) => registerEventListener(type, scriptEvent)
        );
      } else {
        registerEventListener(scriptEvent.type, scriptEvent);
      }
    });
  }
  __name(handlerEvents, "handlerEvents");
  function registerEventListener(type, event) {
    const listener = setListener(event);
    const target = event.target;
    console.assert(!!target, "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D\u043E \u043A \u0447\u0435\u043C\u0443 \u043F\u0440\u0438\u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C \u0441\u043B\u0443\u0448\u0430\u0442\u0435\u043B\u044C \u0441\u043E\u0431\u044B\u0442\u0438\u0439.");
    console.assert(!!type, "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D \u0442\u0438\u043F \u0441\u043E\u0431\u044B\u0442\u0438\u044F.");
    if (Array.isArray(type) && type[0] === "attachEvent") {
      if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
        listener();
      } else if (typeof type[1] === "string") {
        target.addEventListener(type[1], listener, event?.options);
      }
    } else if (typeof type === "function") {
      const result = type(listener);
      if (typeof result === "function" || typeof result === "boolean" && result) {
        listener();
      } else if (typeof result === "string") {
        target.addEventListener(result, listener, event?.options);
      } else if (Array.isArray(result)) {
        target.addEventListener(result[0], result[1], result?.[2]);
      } else if (typeof result === "object" && Object.hasOwn(result, "type")) {
        registerEventListener(result.type, result);
      }
    } else if (typeof type === "string") {
      target.addEventListener(type, listener, event?.options);
    }
  }
  __name(registerEventListener, "registerEventListener");
  function setListener(event) {
    return function(evt) {
      if (preventByCondition(event?.preconditions) || !Object.hasOwn(event, "parentEvent") && preventByCondition(handler?.preconditions)) {
        return;
      }
      if (!Object.hasOwn(event, "listener")) {
        console.warn("listener \u043D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D", event);
      } else if (typeof event?.listener === "function") {
        event.listener(evt, event?.parentEvent);
      }
      handlerEvents(event?.children, event);
    };
  }
  __name(setListener, "setListener");
  function preventByCondition(preconditions) {
    return !!(preconditions && (preconditions?.predicates?.some(
      (predicate) => !predicate(preconditions?.paths)
    ) || preconditions?.paths?.some(
      (path) => !window.location.href.match(path)
    )));
  }
  __name(preventByCondition, "preventByCondition");
}
__name(defineHandler, "defineHandler");
export {
  defineHandler
};

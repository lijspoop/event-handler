

// https://github.com/dimaslanjaka/js-prototypes/blob/7005460fd7c4fd117edf58b64d2520ce11a490e9/src/globals.d.ts#L105
declare global {
  interface Document {
    /**
     * window.addEventListener
     *
     * Appends an event listener for events whose type attribute value is type. The callback argument sets the callback
     * that will be invoked when the event is dispatched.
     *
     * The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the
     * method behaves exactly as if the value was specified as options's capture.
     */
    attachEvent: any;
  }
}

// я названия делать не умею, так что просто хуйни понаписал

export interface EventHandler {
  // предварительные проверки в начале выполнения слушателя события
  preconditions?: EventPrecondition;
  init?: () => void;
  events?: EventDefinition[];
}

// предотвращает обработку события, если указанный `path` не найден в `window.location.href`
// или, если `predicate` возвращает false
export interface EventPrecondition {
  /**
   * Пути, которые будут проверяться в начале события для предотвращения обработки события.
   * 
   * Если строка не содержится в `window.location.href`, то обработка события предотвращается.
   */
  paths?: (string | RegExp)[];
  /**
   * Функции-предикаты, которые будут вызваны в начале события для предотвращения обработки события.
   * 
   * Если функция возвращает false, то обработка события предотвращается.
   */
  predicates?: ((paths: (string | RegExp)[] | undefined) => boolean)[];
}

export interface EventDefinition {
  target: Window | Document | HTMLElement;
  type: EventType | CustomEventType | EventListenerPredicate;
  listener?: EventScriptListener;
  options?: boolean | AddEventListenerOptions;
  // события, которые регистрируются при срабатывании родительского события
  children?: ScriptChildrenEvent[];
  // предварительные проверки в начале выполнения слушателя события
  preconditions?: EventPrecondition;
  parentEvent?: EventDefinition;
}

export type EventType = EventScriptMap | EventScriptMap[];

export type CustomEventType = (
  | EventScriptMap
  | ['attachEvent', EventScriptMap]
  | EventListenerPredicate
)[];

export type EventListenerPredicate = (
  listener: EventScriptListener,
) =>
  | EventScriptMap
  | [EventScriptMap, (ev?: Event) => void, AddEventListenerOptions?]
  | EventDefinition
  | boolean;

export type EventScriptMap = keyof DocumentEventMap | string;

export type EventScriptListener = (
  ev?: DocumentEventMap[keyof DocumentEventMap],
  parentEv?: EventDefinition,
) => any;

export type RegisterEventListenerType =
  | EventType
  | CustomEventType
  | EventListenerPredicate
  | ['attachEvent', EventScriptMap];

export interface ScriptChildrenEvent extends EventDefinition {
  listener: EventScriptListener;
}

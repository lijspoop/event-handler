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
interface EventHandler {
    preconditions?: EventPrecondition;
    init?: () => void;
    events?: EventDefinition[];
}
interface EventPrecondition {
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
interface EventDefinition {
    target: Window | Document | HTMLElement;
    type: EventType | CustomEventType | EventListenerPredicate;
    listener?: EventScriptListener;
    options?: boolean | AddEventListenerOptions;
    children?: ScriptChildrenEvent[];
    preconditions?: EventPrecondition;
    parentEvent?: EventDefinition;
}
type EventType = EventScriptMap | EventScriptMap[];
type CustomEventType = (EventScriptMap | ['attachEvent', EventScriptMap] | EventListenerPredicate)[];
type EventListenerPredicate = (listener: EventScriptListener) => EventScriptMap | [EventScriptMap, (ev?: Event) => void, AddEventListenerOptions?] | EventDefinition | boolean;
type EventScriptMap = keyof DocumentEventMap | string;
type EventScriptListener = (ev?: DocumentEventMap[keyof DocumentEventMap], parentEv?: EventDefinition) => any;
interface ScriptChildrenEvent extends EventDefinition {
    listener: EventScriptListener;
}

declare function defineHandler(handler: EventHandler): void;

export { defineHandler };

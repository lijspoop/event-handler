in package.json:

```json
{
  "dependencies": {
    "@lijspoop/event-handler": "github:lijspoop/event-handler"
  }
}
```

Turbolinks example:

```ts
import { defineHandler } from '@lijspoop/event-handler';

defineHandler({
  events: [
    {
      preconditions: {
        predicates: [
          () => !!document.querySelector('button')
        ]
      },
      target: document,
      type: [
        'turbolinks:load',
        [ 'attachEvent', 'DOMContentLoaded' ]
      ],
      listener: () => {
        console.log('page loaded')
      }
    },
    {
      preconditions: {
        predicates: [
          () => !!document.getElementById('test')
        ]
      },
      target: document,
      type: 'turbolinks:before-cache',
      listener: () => {
        document.getElementById('test').remove();
      }
    }
  ]
});
```

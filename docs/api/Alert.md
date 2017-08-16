# Alert

> Create contextual feedback

## Type: [Component](../Glossary.md/#Component)
Add stylized, dismissable, alerts to your project with the Alert component.

![A preview of the Alert Component](../img/alert.gif)

## Example
Simply add in the `Alert` tag and fill in necessary attributes which you'll find below. Instead of adding a button, we've made it to where you simply have to click the alert to dismiss it.

```ts
<Alert classNames="testy westy" type="success" animated animationStyle="tada">
  [SUCCESS] You are being logged in as <a href="#">Adrian</a>.
</Alert>
```

## Attributes
`Alert` has the following attributes:

---

### `type`
**Type**: `null | 'error' | 'info' | 'success' | 'update' | 'warning'`
**React Type**: `props`
**Required**: `false`
**Default**: none

Specify which type of alert you want to render. The `type` is simply a way of separating `alert` types from extra classes. Meaning you could add the type as a class without affecting performance.

<!-- ADD A LINE IF THERE'S MORE ATTRIBUTES -->
---

### `classNames`
**Type**: `string`
**React Type**: `props`
**Required**: `false`
**Default**: `alert`

Specify which type of alert you want to render in addition to `alert` and the `type`.

---

### `animated`
**Type**: `boolean`
**React Type**: `props`
**Required**: `false` (unless you add the `animationStyle` attribute)
**Default**: `false`

Simply adding this attribute by itself acts as a boolean, using its presence as true or false if not present. Must be added if you're specifying an `animationStyle`.

---

### `animationStyle`
**Type**: `Animate` see [AnimateCSS](../frameworks/AnimateCSS.md)
**React Type**: `props`
**Required**: `false`
**Default**: none

Add an animation style your `Alert` component!

# MonacoEditor

> Add a code editor to your project.

### Type: [Component](../Glossary.md)

Use the `MonacoEditor`component to embed a code editor within your project, site, application. The editor defaults to `height: 100%` and `width: 100%`, which is easily changeable by adding the height or width attributes and specifying their new values within Curly brackets - `{ }` -- also called **braces**.

## Example
To embed an editor within your app, simply add the `MonacoEditor` tag within any component, or tsx file. This component will automatically spawn its own `<div>` element. Within the `options` field you can specify any compatible option from [monaco](https://microsoft.github.io/monaco-editor/api/index.html).[editor](https://microsoft.github.io/monaco-editor/api/modules/monaco.editor.html).[IEditorOptions](https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditoroptions.html). As of August 6, 2017, all 0.9.0 Editor Options are supported.

```ts
<MonacoEditor 
  options={{
    autoLayout: true
  }}
  width={900} 
  height={800} 
  value="Hello, World!" 
  className='testy-westy' 
  language='javascript'
/>
```

## Styling
The `MonacoEditor` is held within its own special `div` tag and does not have specialized styles besides what is native to the editor, and width / height attributes as of 0.1.0. You may retrieve the `MonacoEditor`'s parent `div` by the `monaco-editor` id or class. Keep in mind that grabbing the parent `div` does not ensure full styling capabilities.

```css
/* id */
#editor {
  width: 800px;
  height: 800px;
}
/* class */
.editor {
  width: 800px;
  height: 800px;
}
```

## Attributes
The `MonacoEditor` has the following attributes:

---

### `options`
**Type**: `object`
**Default**: none

```ts
<MonacoEditor options={{autoLayout: true}}>
```
Sets any compatible option from monaco-editor@^0.9.0 to the editor. Options range from `autoLayout` to fit the page, to custom `wordWrap` for when a long line should collapse to a second line.

---

### `width`
**Type**: `number`
**Default**: `100%`

```ts
<MonacoEditor width={800}>
```
Resets the `width` of the `MonacoEditor`'s parent `div`. If no `width` is specified the editor will default to a width of 100%.

---

### `height`
**Type**: `number`
**Default**: `100%`

```ts
<MonacoEditor height={800}>
```
Resets the `height` of the `MonacoEditor`'s parent `div`. If no `height` is specified the editor will default to a height of 100%.

---

### `language`
**Type**: `string`
**Default**: `javascript`

```ts
<MonacoEditor langauge="html">
```
Sets the language and color syntax highlighting to the specified language, alongside activating Intellisense for any compatible language.

---

### `theme`
**Type**: `string`
**Default**: `vs-dark`

```ts
<MonacoEditor theme="vs">
```
Sets the overall color scheme and syntax highlighting to the editor.

---

### `className`
**Type**: `string`
**Default**: `monaco-editor`

```ts
<MonacoEditor className="testy westy">
```
Gives additional `class`es to the `MonacoEditor`'s parent `div` which is `monaco-editor`.

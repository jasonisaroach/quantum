# Chart
> Add dynamic charts to your application.

### Type: [Component](../Glossary.md/#Component)
Use the `Chart` component to embed a dynamic chart within your project, site, application. `Chart` has no defaults, which means simply calling the Chart class will cause errors.

![Preview of Chart with type: line](https://image.prntscr.com/image/IGxJ-TebRPS7_4uUm0yjTQ.png)

## Example
To embed a new `Chart` component within your app, simply add the `Chart` tag within any component and supply the required parameters to get a fully functioning chart up and running. This component will spawn a canvas

```ts
<Chart
  width={900}
  height={800}
  name="randoms"
  type="bar"
  data={{
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ]
        borerColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
  }}
  options={{
    maintainAspectRatio: false
  }}
/>
```

## Attributes
`Chart` has the following attributes:

---

### `type`
**Type**: `string`
**React Type**: `props`
**Required**: `true`
**Default**: none

Tells `Chart` how to render its data. **Not all chart types work**, this is due to chart.js' type definitions `type ChartType = 'line' | 'bar' | 'radar' | 'doughnut' | 'polarArea' | 'bubble';` which we can't manually edit without issues.

---

### `name`
**Type**: `string`
**React Type**: `props`
**Required**: `true`
**Default**: none

Gives the new `Chart` a unique `id`, `class`, and `name`. When a name is specified, the new `Chart` gives its id and class the name as a prefix, appended by `-chart`.

---

### `data`
**Type**: `object`
**React Type**: `props`
**Required**: `true`
**Default**: none

The data within the new `Chart`. When the data is changed, the chart will refresh.

---

### `options`
**Type**: `object`
**React Type**: `props`
**Required**: `true`
**Default**: none

The user-defined configuration for the new `Chart`. Currently a `props` but may be changed to a `state` down the road should the need arise.

**Warning: You must add `maintainAspectRatio: false` for the chart to abide by the `width` and `height` settings**

---

### `height`
**Type**: `number`
**React Type**: `props`
**Required**: `false`
**Default**: `400`

The size parameter to control how tall the new `Chart` should be.

**Warning: You must add `maintainAspectRatio: false` for the chart to abide by the `width` and `height` settings**

---

### `width`
**Type**: `number`
**React Type**: `props`
**Required**: `false`
**Default**: `400`

The size parameter to control how wide the new `Chart` should be.

**Warning: You must add `maintainAspectRatio: false` for the chart to abide by the `width` and `height` settings**

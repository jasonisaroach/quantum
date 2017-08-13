# Chart
> Add dynamic charts to your application.

### Type: [Component](../Glossary.md)
Use the `Chart` component to embed a dynamic chart within your project, site, application. `Chart` has no defaults, which means simply calling the Chart class will cause errors.

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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }}
/>
```

## Attributes
`Chart` has the following attributes:

---

### `type`
**Type**: `string`
**React Type**: `prop`
**Required**: `true`
**Default**: none

Tells `Chart` how to render its data.

---

### `name`
**Type**: `string`
**React Type**: `prop`
**Required**: `true`
**Default**: none

Gives the new `Chart` a unique `id`, `class`, and `name`. When a name is specified, the new `Chart` gives its id and class the name as a prefix, appended by `-chart`.

---

### `data`
**Type**: `object`
**React Type**: `state`
**Required**: `true`
**Default**: none

The data within the new `Chart`. When the data is changed, the chart will refresh.

---

### `options`
**Type**: `object`
**React Type**: `prop`
**Required**: `true`
**Default**: none

The user-defined configuration for the new `Chart`. Currently a `prop` but may be changed to a `state` down the road should the need arise.

---

### `height`
**Type**: `number`
**React Type**: `prop`
**Required**: `false`
**Default**: `400`

The size parameter to control how tall the new `Chart` should be.

---

### `width`
**Type**: `number`
**React Type**: `prop`
**Required**: `false`
**Default**: `400`

The size parameter to control how wide the new `Chart` should be.

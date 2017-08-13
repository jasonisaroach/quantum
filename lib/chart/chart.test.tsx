import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Chart } from './chart'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Chart
      width={500}
      height={500}
      options={{
        scales: {}
      }}
      data={{ labels: ['hello'] }}
      type="bar"
    />,
    div
  )
})

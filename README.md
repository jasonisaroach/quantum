# Quantum
> A React-ive TypeScript framework!

Quantum is a React framework with native TypeScript support and secondary JavaScript support.

## Installation
`npm install quantum-ts`

## Usage
Quantum is simply a set of prebuilt components for fair use. One of our best components being the Monaco Editor which can be use to embed a code editor within your application. A good example can be seen below.

```tsx
// Import React for Component
import * as React from 'react'
// Import ClassNames for better class resolution
import * as classNames from 'classnames'
// Import Application State Interface
import { IAppState } from './lib/app-state'
// Import the Monaco Editor Component from Quantum TypeScript
import { MonacoEditor } from 'quantum-ts'

interface IAppProps {
  // Ensure we restrict classes to strings or numbers (some people use numbers)
  readonly className?: string | number
}

export class App extends React.Component<IAppProps, IAppState> {
  public render() {
    const className = classNames('container', this.props.className)
    const options = {
      autoLayout: true
    }
    return (
      <div className={className}>
        <MonacoEditor width={800} height={800} options={options} langauge="javascript"/>
      </div>
    )
  }
}
```

## License
Quantum TypeScript is released under the [Apache 2.0](https://choosealicense.com/licenses/apache-2.0/) license

## Latest Release v0.5.0 (08.15.2017)
 - [NEW] - Added [AnimateCSS](https://daneden.github.io/animate.css/) support for every component!
 - [NEW] - Added a dismissable `Alert` component!
 - [IMPROVED] - Add support for custom units when styling components

import * as React from 'react'
import * as classNames from 'classnames'

interface IAppProps {
  readonly classNames?: string
}

export class App extends React.Component<IAppProps, {}> {
  public render() {
    const className = classNames('app-container', this.props.classNames)
    return <div className={className} />
  }
}

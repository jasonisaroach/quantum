import * as React from 'react'
import * as ClassNames from 'classnames'
import './alert.css'

interface IAlertProps {
  /** The user-defined classes */
  readonly className?: string
}

interface IAlertState {
  /** Add your states here */
}

export class Alert extends React.Component<IAlertProps, IAlertState> {
  constructor(props: IAlertProps) {
    super(props)
  }

  // public componentWillMount() {}

  // public componentDidMount() {}

  // public componentWillReceiveProps(nextProps: IAlertProps) {}

  public shouldComponentUpdate(nextProps: IAlertProps, nextState: IAlertState) {
    return true
  }

  // public componentWillUpdate(nextProps: IAlertProps, nextState: IAlertState) {}

  // public componentDidUpdate(prevProps: IAlertProps, prevState: IAlertState) {}

  // public componentWillUnmount() {}

  public render() {
    const className = ClassNames('alert')
    return (
      <div className={className}>
        {this.props.children}
      </div>
    )
  }
}

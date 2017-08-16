import * as React from 'react'
import * as ClassNames from 'classnames'
import { IBaseProps } from '../lib/base-props'
import './alert.css'
import '../lib/animate.css'

interface IAlertProps extends IBaseProps {
  /** The user-defined classes */
  readonly type?: null | 'error' | 'info' | 'success' | 'update' | 'warning'
}

interface IAlertState {
  /** Add your states here */
  isShowing: boolean
}

export class Alert extends React.Component<IAlertProps, IAlertState> {
  constructor(props: IAlertProps) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = { isShowing: false }
  }

  public componentWillMount() {
    this.setState({ isShowing: true })
  }

  // public componentDidMount() {}

  // public componentWillReceiveProps(nextProps: IAlertProps) {}

  public shouldComponentUpdate(nextProps: IAlertProps, nextState: IAlertState) {
    return true
  }

  // public componentWillUpdate(nextProps: IAlertProps, nextState: IAlertState) {}

  // public componentDidUpdate(prevProps: IAlertProps, prevState: IAlertState) {}

  // public componentWillUnmount() {}

  public render() {
    const className = ClassNames(
      'alert',
      { infinite: this.props.infinite, animated: this.props.animated },
      this.props.classNames,
      this.props.type,
      this.props.animated ? this.props.animationStyle : null
    )

    let alert: JSX.Element = null
    const isShowing = this.state.isShowing
    if (isShowing) {
      alert = (
        <div onClick={this.handleClick}>
          <div className={className}>
            {this.props.children}
          </div>
        </div>
      )
    }

    return alert
  }
  private handleClick() {
    this.setState({ isShowing: false })
  }
}

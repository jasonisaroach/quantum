import * as React from 'react'
import * as ClassNames from 'classnames'
import './css/font-awesome.css'

interface IIconProps {
  /** The user-defined classes */
  readonly className?: string
}

interface IIconState {
  /** Add your states here */
}

export class Icon extends React.Component<IIconProps, IIconState> {
  constructor(props: IIconProps) {
    super(props)
  }

  public componentWillMount() {}

  public componentDidMount() {}

  public componentWillReceiveProps(nextProps: IIconProps) {}

  public shouldComponentUpdate(nextProps: IIconProps, nextState: IIconState) {
    return true
  }

  public componentWillUpdate(nextProps: IIconProps, nextState: IIconState) {}

  public componentDidUpdate(prevProps: IIconProps, prevState: IIconState) {}

  public componentWillUnmount() {}

  public render() {
    const className = ClassNames('icon')
    return (
      <div className={className}>
        <div id="icon" />
      </div>
    )
  }
}

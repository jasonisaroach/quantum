import * as React from 'react'
import * as ClassNames from 'classnames'
import { IBaseProps } from '../lib/base-props'
import './Dialog.css'

interface IDialogProps extends IBaseProps {
  /** The user-defined classes */
}

interface IDialogState {
  /** Add your states here */
}

export class Dialog extends React.Component<IDialogProps, IDialogState> {
  constructor(props: IDialogProps) {
    super(props)
  }

  public componentWillMount() {}

  public componentDidMount() {}

  public componentWillReceiveProps(nextProps: IDialogProps) {}

  public shouldComponentUpdate(nextProps: IDialogProps, nextState: IDialogState) {
    return true
  }

  public componentWillUpdate(nextProps: IDialogProps, nextState: IDialogState) {}

  public componentDidUpdate(prevProps: IDialogProps, prevState: IDialogState) {}

  public componentWillUnmount() {}

  public render() {
    const className = ClassNames('dialog')
    return (
      <div className={className}>
        <div id="dialog" />
      </div>
    )
  }
}

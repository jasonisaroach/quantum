import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
// import MonacoEditor from 'react-monaco-editor'
import { Alert } from './'
// import { App } from './app'
import './index.css'

ReactDOM.render(
  <div>
    <Alert classNames="testy westy">This is a standard Alert.</Alert>
    <Alert classNames="testy westy" type="error" animated animationStyle="shake">
      [ERR!] I've hit a small issue. The error log can be found{' '}
      <a href="#">here</a>.
    </Alert>
    <Alert classNames="testy westy" type="info" animated animationStyle="flash">
      [INFO] Your update went through <a href="#">here</a>.
    </Alert>
    <Alert classNames="testy westy" type="success" animated animationStyle="tada">
      [SUCCESS] You're being logged in as <a href="#">Adrian</a>.
    </Alert>
    <Alert
      classNames="testy westy"
      type="update"
      animated
      animationStyle="bounce"
    >
      [UPDATE] Your <a href="#">status</a> was updated.
    </Alert>
    <Alert
      classNames="testy westy"
      type="warning"
      animated
      animationStyle="flipInX"
    >
      [WARN] Your password may be incorrect, <a href="#">forgot your password</a>?
    </Alert>
  </div>,
  document.getElementById('app-container') as HTMLElement
)
registerServiceWorker()

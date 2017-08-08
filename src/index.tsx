import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
// import MonacoEditor from 'react-monaco-editor'
import { App } from './app'
// import { App } from './app'
// import './index.css'

ReactDOM.render(
  <App />,
  document.getElementById('app-container') as HTMLElement
)
registerServiceWorker()

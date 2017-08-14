import * as React from 'react'
import * as ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
// import MonacoEditor from 'react-monaco-editor'
import { MonacoEditor } from './'
// import { App } from './app'
import './index.css'

ReactDOM.render(
  <MonacoEditor language="javascript" options={{autoLayout: true}} height="100vh" width="100vw" theme="vs-dark" />,
  document.getElementById('app-container') as HTMLElement
)
registerServiceWorker()

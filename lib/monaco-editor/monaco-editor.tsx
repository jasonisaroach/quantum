import * as React from 'react'
import * as classnames from 'classnames'
import { IBaseProps } from '../lib/base-props'

interface IMonacoEditorProps extends IBaseProps {
  value?: string
  defaultValue?: string
  language: string
  theme?: string
  options: object
  requireConfig?: object | undefined
  context?: any
}

interface IMonacoEditorState {}

export class MonacoEditor extends React.Component<
  IMonacoEditorProps,
  IMonacoEditorState
> {
  currentValue: string | undefined
  preventTriggerChangeEvent: boolean
  editor: any

  constructor(props: IMonacoEditorProps) {
    super(props)
    this.currentValue = props.value
  }

  componentDidMount() {
    this.afterViewInit()
  }

  componentWillUnmount() {
    this.destroyMonaco()
  }

  componentDidUpdate(prevProps: IMonacoEditorProps) {
    const context = this.props.context || window
    if (this.props.value !== this.currentValue) {
      // Always refer to the latest value
      this.currentValue = this.props.value
      // Consider the situation of rendering 1+ times before the editor mounted
      if (this.editor) {
        this.preventTriggerChangeEvent = true
        this.editor.setValue(this.currentValue)
        this.preventTriggerChangeEvent = false
      }
    }
    if (prevProps.language !== this.props.language) {
      context.monaco.editor.setModelLanguage(
        this.editor.getModel(),
        this.props.language
      )
    }
  }

  // editorWillMount(monaco: any) {
  //   const { editorWillMount } = this.props
  //   this.editorWillMount(monaco)
  // }

  // editorDidMount(editor: any, monaco: any) {
  //   const { editorDidMount, onChange } = this.props
  //   this.editorDidMount(editor, monaco)
  //   editor.onDidChangeModelContent((event: any) => {
  //     const value = editor.getValue()
  //     // Always refer to the latest value
  //     this.currentValue = value
  //     // Only invoking when user input changed
  //     if (!this.preventTriggerChangeEvent) {
  //       this.onChange(value, event)
  //     }
  //   })
  // }

  afterViewInit() {
    // const { requireConfig } = this.props
    const loaderUrl = 'vs/loader.js'
    const context = this.props.context || window
    const onGotAmdLoader = () => {
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        // Do not use webpack
        // if (requireConfig.paths && requireConfig.paths.vs) {
        //   context.require.config(requireConfig)
        // }
      }
      // Load monaco
      context.require(['vs/editor/editor.main'], () => {
        this.initMonaco()
      })
      // Call the delayed callbacks when AMD loader has been loaded
      if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false
        let loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__
        if (loaderCallbacks && loaderCallbacks.length) {
          let currentCallback = loaderCallbacks.shift()
          while (currentCallback) {
            currentCallback.fn.call(currentCallback.context)
            currentCallback = loaderCallbacks.shift()
          }
        }
      }
    }

    // Load AMD loader if necessary
    if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
      // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
      //  delay to call callbacks except the first one
      context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ =
        context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || []
      context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
        context: this,
        fn: onGotAmdLoader
      })
    } else {
      if (typeof context.require === 'undefined') {
        var loaderScript = context.document.createElement('script')
        loaderScript.type = 'text/javascript'
        loaderScript.src = loaderUrl
        loaderScript.addEventListener('load', onGotAmdLoader)
        context.document.body.appendChild(loaderScript)
        context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true
      } else {
        onGotAmdLoader()
      }
    }
  }

  initMonaco() {
    const value =
      this.props.value !== null ? this.props.value : this.props.defaultValue
    const { language, theme, options } = this.props
    const containerElement = document.getElementById('monaco-editor')
    const context = this.props.context || window
    if (typeof context.monaco !== 'undefined') {
      // Before initializing monaco editor
      // this.editorWillMount(context.monaco)
      this.editor = context.monaco.editor.create(containerElement, {
        value,
        language,
        theme,
        ...options
      })
      // After initializing monaco editor
      // this.editorDidMount(this.editor, context.monaco)
    }
  }

  destroyMonaco() {
    if (typeof this.editor !== 'undefined') {
      this.editor.dispose()
    }
  }

  public render() {
    const classNames = classnames('monaco-editor', this.props.classNames)
    return (
      <div
        id="monaco-editor"
        style={{
          height: this.props.height ? this.props.height : '100%',
          width: this.props.width ? this.props.width : '100%'
        }}
        className={classNames}
      />
    )
  }
}

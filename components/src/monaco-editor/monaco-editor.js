var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import * as classnames from 'classnames';
var MonacoEditor = (function (_super) {
    __extends(MonacoEditor, _super);
    function MonacoEditor(props) {
        var _this = _super.call(this, props) || this;
        _this.currentValue = props.value;
        return _this;
    }
    MonacoEditor.prototype.componentDidMount = function () {
        this.afterViewInit();
    };
    MonacoEditor.prototype.componentWillUnmount = function () {
        this.destroyMonaco();
    };
    MonacoEditor.prototype.componentDidUpdate = function (prevProps) {
        var context = this.props.context || window;
        if (this.props.value !== this.currentValue) {
            // Always refer to the latest value
            this.currentValue = this.props.value;
            // Consider the situation of rendering 1+ times before the editor mounted
            if (this.editor) {
                this.preventTriggerChangeEvent = true;
                this.editor.setValue(this.currentValue);
                this.preventTriggerChangeEvent = false;
            }
        }
        if (prevProps.language !== this.props.language) {
            context.monaco.editor.setModelLanguage(this.editor.getModel(), this.props.language);
        }
    };
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
    MonacoEditor.prototype.afterViewInit = function () {
        var _this = this;
        // const { requireConfig } = this.props
        var loaderUrl = 'vs/loader.js';
        var context = this.props.context || window;
        var onGotAmdLoader = function () {
            if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
                // Do not use webpack
                // if (requireConfig.paths && requireConfig.paths.vs) {
                //   context.require.config(requireConfig)
                // }
            }
            // Load monaco
            context.require(['vs/editor/editor.main'], function () {
                _this.initMonaco();
            });
            // Call the delayed callbacks when AMD loader has been loaded
            if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
                context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = false;
                var loaderCallbacks = context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__;
                if (loaderCallbacks && loaderCallbacks.length) {
                    var currentCallback = loaderCallbacks.shift();
                    while (currentCallback) {
                        currentCallback.fn.call(currentCallback.context);
                        currentCallback = loaderCallbacks.shift();
                    }
                }
            }
        };
        // Load AMD loader if necessary
        if (context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__) {
            // We need to avoid loading multiple loader.js when there are multiple editors loading concurrently
            //  delay to call callbacks except the first one
            context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ =
                context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__ || [];
            context.__REACT_MONACO_EDITOR_LOADER_CALLBACKS__.push({
                context: this,
                fn: onGotAmdLoader
            });
        }
        else {
            if (typeof context.require === 'undefined') {
                var loaderScript = context.document.createElement('script');
                loaderScript.type = 'text/javascript';
                loaderScript.src = loaderUrl;
                loaderScript.addEventListener('load', onGotAmdLoader);
                context.document.body.appendChild(loaderScript);
                context.__REACT_MONACO_EDITOR_LOADER_ISPENDING__ = true;
            }
            else {
                onGotAmdLoader();
            }
        }
    };
    MonacoEditor.prototype.initMonaco = function () {
        var value = this.props.value !== null ? this.props.value : this.props.defaultValue;
        var _a = this.props, language = _a.language, theme = _a.theme, options = _a.options;
        var containerElement = document.getElementById('monaco-editor');
        var context = this.props.context || window;
        if (typeof context.monaco !== 'undefined') {
            // Before initializing monaco editor
            // this.editorWillMount(context.monaco)
            this.editor = context.monaco.editor.create(containerElement, __assign({ value: value,
                language: language,
                theme: theme }, options));
            // After initializing monaco editor
            // this.editorDidMount(this.editor, context.monaco)
        }
    };
    MonacoEditor.prototype.destroyMonaco = function () {
        if (typeof this.editor !== 'undefined') {
            this.editor.dispose();
        }
    };
    MonacoEditor.prototype.render = function () {
        var classNames = classnames('monaco-editor', this.props.classNames);
        return (React.createElement("div", { id: "monaco-editor", style: {
                height: this.props.height ? this.props.height : '100%',
                width: this.props.width ? this.props.width : '100%'
            }, className: classNames }));
    };
    return MonacoEditor;
}(React.Component));
export { MonacoEditor };
//# sourceMappingURL=monaco-editor.js.map
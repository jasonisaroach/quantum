var __extends =
  (this && this.__extends) ||
  (function() {
    var extendStatics =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function(d, b) {
          d.__proto__ = b
        }) ||
      function(d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
      }
    return function(d, b) {
      extendStatics(d, b)
      function __() {
        this.constructor = d
      }
      d.prototype =
        b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
    }
  })()
var __assign =
  (this && this.__assign) ||
  Object.assign ||
  function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i]
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
    }
    return t
  }
var __rest =
  (this && this.__rest) ||
  function(s, e) {
    var t = {}
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
        if (e.indexOf(p[i]) < 0) t[p[i]] = s[p[i]]
    return t
  }
import * as React from 'react'
import * as ClassNames from 'classnames'
import * as ChartJS from 'chart.js'
var IsEqual = require('lodash.isequal')
var Find = require('lodash.find')
var subChart = require('chart.js')
var Chart = (function(_super) {
  __extends(Chart, _super)
  function Chart(props) {
    var _this = _super.call(this, props) || this
    _this.onClickEvent = function(event) {
      _this.getDatasetAtEvent &&
        _this.getDatasetAtEvent(
          _this.chartInstance.getDatasetAtEvent(event),
          event
        )
      _this.getElementAtEvent &&
        _this.getElementAtEvent(
          _this.chartInstance.getElementAtEvent(event),
          event
        )
      _this.getElementsAtEvent &&
        _this.getElementsAtEvent(
          _this.chartInstance.getElementsAtEvent(event),
          event
        )
      _this.onElementsClick &&
        _this.onElementsClick(
          _this.chartInstance.getElementsAtEvent(event),
          event
        )
    }
    return _this
  }
  Chart.prototype.componentWillMount = function() {
    // this.chartInstance = undefined
  }
  Chart.prototype.componentDidMount = function() {
    this.renderChart()
  }
  // public componentWillReceiveProps(nextProps: IChartProps) {}
  Chart.prototype.shouldComponentUpdate = function(nextProps, nextState) {
    var props = this.props
    if (nextProps.reRender === true) {
      return true
    }
    if (props.height !== nextProps.height || props.width !== nextProps.width) {
      return true
    }
    if (props.type !== nextProps.type) {
      return true
    }
    if (!IsEqual(props.options, nextProps.options)) {
      return true
    }
    var nextData = this.transformDataProp(nextProps)
    if (!IsEqual(this.shadowData, nextData)) {
      return true
    }
    return false
  }
  // public componentWillUpdate(nextProps: IChartProps, nextState: IChartState) {}
  Chart.prototype.componentDidUpdate = function(prevProps, prevState) {
    if (this.props.reRender) {
      this.chartInstance.destroy()
      this.renderChart()
      return
    }
    this.updateChart()
  }
  Chart.prototype.transformDataProp = function(props) {
    var data = props.data
    if (typeof data === 'function') {
      var node = document.getElementById('bar-chart')
      return data(node)
    } else {
      return data
    }
  }
  Chart.prototype.memoizeDataProps = function(props) {
    if (!this.props.data) {
      return
    }
    var data = this.transformDataProp(this.props)
    this.shadowData = __assign({}, data, {
      datasets:
        data.datasets &&
        data.datasets.map(function(set) {
          return __assign({}, set)
        })
    })
    return data
  }
  Chart.prototype.updateChart = function() {
    var _this = this
    var options = this.props.options
    var data = this.memoizeDataProps(this.props)
    if (!this.chartInstance) {
      return
    }
    if (options) {
      this.chartInstance.options = subChart.helpers.configMerge(
        this.chartInstance.options,
        options
      )
    }
    var currentDatasets =
      (this.chartInstance.config.data &&
        this.chartInstance.config.data.datasets) ||
      []
    var nextDatasets = data.datasets || []
    var currentDatasetKeys = currentDatasets.map(this.datasetKeyProvider)
    var nextDatasetKeys = nextDatasets.map(this.datasetKeyProvider)
    var newDatasets = nextDatasets.filter(function(d) {
      return currentDatasetKeys.indexOf(_this.datasetKeyProvider(d)) === -1
    })
    var _loop_1 = function(idx) {
      var currentDatasetKey = this_1.datasetKeyProvider(currentDatasets[idx])
      if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
        // deleted series
        currentDatasets.splice(idx, 1)
      } else {
        var retainedDataset_1 = Find(nextDatasets, function(d) {
          return _this.datasetKeyProvider(d) === currentDatasetKey
        })
        if (retainedDataset_1) {
          // update it in place if it is a retained dataset
          currentDatasets[idx].data.splice(retainedDataset_1.data.length)
          retainedDataset_1.data.forEach(function(point, pid) {
            currentDatasets[idx].data[pid] = retainedDataset_1.data[pid]
          })
          // const { data, ...otherProps } = retainedDataset
          currentDatasets[idx] = __assign(
            { data: currentDatasets[idx].data },
            currentDatasets[idx],
            retainedDataset_1.otherProps
          )
        }
      }
    }
    var this_1 = this
    for (var idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
      _loop_1(idx)
    }
    // finally add any new series
    newDatasets.forEach(function(d) {
      return currentDatasets.push(d)
    })
    var datasets = data.datasets,
      rest = __rest(data, ['datasets'])
    this.chartInstance.config.data = __assign(
      {},
      this.chartInstance.config.data,
      rest
    )
    this.chartInstance.update()
  }
  Chart.prototype.componentWillUnmount = function() {
    this.chartInstance.destroy()
  }
  Chart.prototype.render = function() {
    var className = ClassNames(
      this.props.name + '-chart',
      this.props.classNames
    )
    // bar.update()
    return React.createElement(
      'div',
      {
        style: {
          width: this.props.width ? this.props.width : 400,
          height: this.props.height ? this.props.height : 400
        }
      },
      React.createElement('canvas', {
        className: className,
        id: this.props.name + '-chart',
        // width={this.props.width}
        // height={this.props.height}
        onClick: this.onClickEvent
      })
    )
  }
  Chart.prototype.renderChart = function() {
    var _a = this.props,
      options = _a.options,
      type = _a.type,
      data = _a.data
    var node = document.getElementById(this.props.name + '-chart')
    // const data = this.memoizeDataProps()
    this.chartInstance = new ChartJS(node, {
      type: type,
      data: data,
      options: options
    })
  }
  return Chart
})(React.Component)
export { Chart }
//# sourceMappingURL=chart.js.map

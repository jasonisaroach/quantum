import * as React from 'react'
import * as ClassNames from 'classnames'
import * as ChartJS from 'chart.js'
import { IBaseProps } from '../lib/base-props'
const IsEqual = require('lodash.isequal')
const Find = require('lodash.find')
const subChart = require('chart.js')

interface IChartProps extends IBaseProps {
  readonly reRender?: boolean
  readonly name: string
  readonly type: ChartJS.ChartType
  readonly data: ChartJS.ChartData
  readonly options: ChartJS.ChartOptions
}

interface IChartState {
  /** Add your states here */
}

export class Chart extends React.Component<IChartProps, IChartState> {
  readonly getDatasetAtEvent: Function
  readonly getElementAtEvent: Function
  readonly getElementsAtEvent: Function
  readonly onElementsClick: Function
  readonly datasetKeyProvider: Function
  // tslint:disable-next-line
  private chartInstance: any
  private shadowData: {}
  constructor(props: IChartProps) {
    super(props)
  }

  public componentWillMount() {
    // this.chartInstance = undefined
  }

  public componentDidMount() {
    this.renderChart()
  }

  // public componentWillReceiveProps(nextProps: IChartProps) {}

  public shouldComponentUpdate(nextProps: IChartProps, nextState: IChartState) {
    const props = this.props
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

    const nextData = this.transformDataProp(nextProps)

    if (!IsEqual(this.shadowData, nextData)) {
      return true
    }

    return false
  }

  // public componentWillUpdate(nextProps: IChartProps, nextState: IChartState) {}

  public componentDidUpdate(prevProps: IChartProps, prevState: IChartState) {
    if (this.props.reRender) {
      this.chartInstance.destroy()
      this.renderChart()
      return
    }
    this.updateChart()
  }

  public transformDataProp(props: IChartProps) {
    const data = props.data
    if (typeof data === 'function') {
      const node = document.getElementById('bar-chart') as HTMLCanvasElement
      return data(node)
    } else {
      return data
    }
  }

  public memoizeDataProps(props?: IChartProps) {
    if (!this.props.data) {
      return
    }
    const data = this.transformDataProp(this.props)

    this.shadowData = {
      ...data,
      datasets:
        data.datasets &&
        data.datasets.map((set: string[]) => {
          return { ...set }
        })
    }
    return data
  }

  public updateChart() {
    const options = this.props.options

    const data = this.memoizeDataProps(this.props)

    if (!this.chartInstance) {
      return
    }

    if (options) {
      this.chartInstance.options = subChart.helpers.configMerge(
        this.chartInstance.options,
        options
      )
    }

    let currentDatasets =
      (this.chartInstance.config.data &&
        this.chartInstance.config.data.datasets) ||
      []
    const nextDatasets = data.datasets || []

    const currentDatasetKeys = currentDatasets.map(this.datasetKeyProvider)
    const nextDatasetKeys = nextDatasets.map(this.datasetKeyProvider)
    const newDatasets = nextDatasets.filter(
      (d: object) =>
        currentDatasetKeys.indexOf(this.datasetKeyProvider(d)) === -1
    )

    for (let idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
      const currentDatasetKey = this.datasetKeyProvider(currentDatasets[idx])
      if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
        // deleted series
        currentDatasets.splice(idx, 1)
      } else {
        const retainedDataset = Find(
          nextDatasets,
          (d: object) => this.datasetKeyProvider(d) === currentDatasetKey
        )
        if (retainedDataset) {
          // update it in place if it is a retained dataset
          currentDatasets[idx].data.splice(retainedDataset.data.length)
          retainedDataset.data.forEach((point: number, pid: number) => {
            currentDatasets[idx].data[pid] = retainedDataset.data[pid]
          })
          // const { data, ...otherProps } = retainedDataset
          currentDatasets[idx] = {
            data: currentDatasets[idx].data,
            ...currentDatasets[idx],
            ...retainedDataset.otherProps
          }
        }
      }
    }
    // finally add any new series
    newDatasets.forEach((d: object) => currentDatasets.push(d))
    const { datasets, ...rest } = data

    this.chartInstance.config.data = {
      ...this.chartInstance.config.data,
      ...rest
    }

    this.chartInstance.update()
  }

  public componentWillUnmount() {
    this.chartInstance.destroy()
  }

  public onClickEvent = (event: React.MouseEvent<HTMLCanvasElement>) => {
    this.getDatasetAtEvent &&
      this.getDatasetAtEvent(this.chartInstance.getDatasetAtEvent(event), event)

    this.getElementAtEvent &&
      this.getElementAtEvent(this.chartInstance.getElementAtEvent(event), event)

    this.getElementsAtEvent &&
      this.getElementsAtEvent(
        this.chartInstance.getElementsAtEvent(event),
        event
      )

    this.onElementsClick &&
      this.onElementsClick(this.chartInstance.getElementsAtEvent(event), event)
  }

  public render() {
    const className = ClassNames(
      this.props.name + '-chart',
      this.props.classNames
    )

    // bar.update()
    return (
      <div
        style={{
          width: this.props.width ? this.props.width : 400,
          height: this.props.height ? this.props.height : 400
        }}
      >
        <canvas
          className={className}
          id={this.props.name + '-chart'}
          // width={this.props.width}
          // height={this.props.height}
          onClick={this.onClickEvent}
        />
      </div>
    )
  }

  public renderChart() {
    const { options, type, data } = this.props
    const node = document.getElementById(
      this.props.name + '-chart'
    ) as HTMLCanvasElement
    // const data = this.memoizeDataProps()

    this.chartInstance = new ChartJS(node, {
      type,
      data,
      options
    })
  }
}

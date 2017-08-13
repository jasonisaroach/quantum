import * as React from 'react'
import * as ClassNames from 'classnames'
import * as ChartJS from 'chart.js'
const IsEqual = require('lodash.isequal')
const Find = require('lodash.find')
const subChart = require('chart.js')

interface IChartProps {
  /** The user-defined classes */
  readonly className?: string
  readonly width?: number
  readonly height?: number
  readonly reRender?: boolean

  readonly type: ChartJS.ChartType
  readonly data: ChartJS.ChartData
  readonly options: ChartJS.ChartOptions
  readonly getDatasetAtEvent?: Function
  readonly getElementAtEvent?: Function
  readonly getElementsAtEvent?: Function
  readonly onElementsClick?: Function
  readonly datasetKeyProvider?: Function
}

interface IChartState {
  /** Add your states here */
}

export class Chart extends React.Component<IChartProps, IChartState> {
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

    const currentDatasetKeys = currentDatasets.map(
      this.props.datasetKeyProvider
    )
    const nextDatasetKeys = nextDatasets.map(this.props.datasetKeyProvider)
    const newDatasets = nextDatasets.filter(
      (d: object) =>
        currentDatasetKeys.indexOf(this.props.datasetKeyProvider(d)) === -1
    )

    for (let idx = currentDatasets.length - 1; idx >= 0; idx -= 1) {
      const currentDatasetKey = this.props.datasetKeyProvider(
        currentDatasets[idx]
      )
      if (nextDatasetKeys.indexOf(currentDatasetKey) === -1) {
        // deleted series
        currentDatasets.splice(idx, 1)
      } else {
        const retainedDataset = Find(
          nextDatasets,
          (d: object) => this.props.datasetKeyProvider(d) === currentDatasetKey
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
    // this.props.getDatasetAtEvent &&
    this.props.getDatasetAtEvent(
      this.chartInstance.getDatasetAtEvent(event),
      event
    )

    // this.props.getElementAtEvent &&
    this.props.getElementAtEvent(
      this.chartInstance.getElementAtEvent(event),
      event
    )

    // this.props.getElementsAtEvent &&
    this.props.getElementsAtEvent(
      this.chartInstance.getElementsAtEvent(event),
      event
    )

    // this.props.onElementsClick &&
    this.props.onElementsClick(
      this.chartInstance.getElementsAtEvent(event),
      event
    )
  }

  public render() {
    const className = ClassNames('chart', this.props.className)

    // bar.update()
    return (
      <div className={className}>
        <canvas
          id="bar-chart"
          width={this.props.width ? this.props.width : '400'}
          height={this.props.height ? this.props.height : '400'}
          onClick={this.onClickEvent}
        />
      </div>
    )
  }

  public renderChart() {
    const { options, type, data } = this.props
    const node = document.getElementById('bar-chart') as HTMLCanvasElement
    // const data = this.memoizeDataProps()

    this.chartInstance = new ChartJS(node, {
      type,
      data,
      options
    })
  }
}

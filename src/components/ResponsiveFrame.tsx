import * as React from "react"

import elementResizeEvent from "element-resize-event"
import { OrdinalFrameProps } from "./types/ordinalTypes"
import { XYFrameProps } from "./types/xyTypes"
import { NetworkFrameProps } from "./types/networkTypes"

export interface ResponsiveFrameProps {
  debounce?: number
  responsiveWidth?: boolean
  responsiveHeight?: boolean
  gridDisplay?: boolean
  elementResizeEvent?: Function
}

export interface ResponsiveFrameState {
  containerHeight?: number
  containerWidth?: number
}

type ActualFrameProps = OrdinalFrameProps | XYFrameProps | NetworkFrameProps

const createResponsiveFrame = ParticularFrame => {
  return class ResponsiveFrame extends React.Component<
    ResponsiveFrameProps & ActualFrameProps,
    ResponsiveFrameState
  > {
    constructor(props) {
      super(props)

      this.state = {
        containerHeight: undefined,
        containerWidth: undefined
      }
    }

    node = null

    static defaultProps = {
      size: [500, 500],
      debounce: 200
    }

    static displayName = `Responsive${ParticularFrame.displayName}`

    isResizing = undefined

    _onResize = (width, height) => {
      this.setState({ containerHeight: height, containerWidth: width })
    }
    componentDidMount() {
      const element = this.node

      const { debounce } = this.props

      const actualElementResizeEvent =
        this.props.elementResizeEvent || elementResizeEvent

      actualElementResizeEvent(element, () => {
        window.clearTimeout(this.isResizing)
        this.isResizing = setTimeout(() => {
          this.isResizing = false

          this.setState({
            containerHeight: element.offsetHeight,
            containerWidth: element.offsetWidth
          })
        }, debounce)
      })
      this.setState({
        containerHeight: element.offsetHeight,
        containerWidth: element.offsetWidth
      })
    }

    render() {
      const {
        responsiveWidth,
        responsiveHeight,
        size,
        dataVersion,
        debounce,
        gridDisplay,
        ...rest
      } = this.props

      const { containerHeight, containerWidth } = this.state

      const actualSize = [...size]

      let returnEmpty = false

      if (responsiveWidth) {
        if (!containerWidth) returnEmpty = true
        actualSize[0] = containerWidth
      }

      if (responsiveHeight) {
        if (!containerHeight) returnEmpty = true
        actualSize[1] = containerHeight
      }

      const dataVersionWithSize = dataVersion + actualSize.toString() + debounce

      return (
        <div
          className="responsive-container"
          style={
            gridDisplay
              ? { minWidth: "0px", minHeight: "0px" }
              : { height: "100%", width: "100%" }
          }
          ref={node => (this.node = node)}
        >
          {!returnEmpty && (
            <ParticularFrame
              {...rest}
              size={actualSize}
              dataVersion={dataVersion ? dataVersionWithSize : undefined}
            />
          )}
        </div>
      )
    }
  }
}

export default createResponsiveFrame

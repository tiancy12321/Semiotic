import * as React from "react"
import { answers } from "../sampledata/questions"
import { OrdinalFrame } from "../../components"

const divStackedBarChart = {
  size: [700, 500],
  data: answers,
  type: "bar",
  projection: "horizontal",
  oAccessor: "question",
  rAccessor: "percent",
  style: (d) => ({ fill: d.color }),
  margin: { top: 30, bottom: 0, left: 80, right: 10 },
  oPadding: 20,
  oLabel: (d, column, i) => (
    <g>
      <rect
        x={3}
        width={610}
        height={50}
        y={-25}
        style={{
          fill: i % 2 === 0 ? "grey" : "white",
          stroke: "none",
          opacity: 0.1
        }}
      />
      <text x={-5} y={5} textAnchor="end">
        {d}
      </text>
    </g>
  ),
  pixelColumnWidth: 50,
  axes: {
    orient: "top",
    tickValues: [-0.6, -0.3, 0, 0.2, 0.4, 0.6, 0.8, 1]
  },
  //  renderMode: "sketchy",
  pieceHoverAnnotation: true
}

export default <OrdinalFrame {...divStackedBarChart} />

import * as React from "react"
import { OrdinalFrame } from "../../components"
import probsRaw from "../sampledata/probly"
import { csvParse } from "d3-dsv"

const probsData = csvParse(probsRaw)

const colors = ["#4d430c", "#00a2ce", "#b6a756", "#b3331d"]

const probsPoints = []
probsData.forEach((d) => {
  Object.keys(d).forEach((key) => {
    probsPoints.push({ term: key, value: +d[key] })
  })
})

const joyChartSettings = {
  size: [700, 500],
  data: probsPoints,
  projection: "horizontal",
  summaryType: {
    type: "ridgeline",
    bins: 10,
    amplitude: 0,
    curve: "monotonex",
    axis: { orient: "right", tickValues: [20] }
  },
  summaryStyle: (d, i) => ({
    fill: colors[i % 4],
    stroke: "black",
    strokeWidth: 2,
    fillOpacity: 0.5,
    strokeOpacity: 0.25
  }),
  oAccessor: "term",
  rAccessor: "value",
  margin: { left: 150, top: 50, bottom: 55, right: 35 },
  axes: { orient: "bottom", label: "Percent" },
  summaryHoverAnnotation: true,
  oLabel: (d) => (
    <text style={{ textAnchor: "end", fill: "grey" }} x={-10} y={5}>
      {d}
    </text>
  )
}

export default (
  <div>
    <iframe
      title="ridgeline-video"
      width="560"
      height="315"
      src="https://www.youtube.com/embed/LoR7TfIWR2k"
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
    <OrdinalFrame {...joyChartSettings} />
  </div>
)

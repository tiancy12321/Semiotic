import * as React from "react"
import { OrdinalFrame } from "../../components"

const testData = [
  { sales: 5, leads: 150, month: "Jan" },
  { sales: 7, leads: 100, month: "Feb" },
  { sales: -7, leads: -75, month: "Mar" },
  { sales: 4, leads: 50, month: "Apr" },
  { sales: -2, leads: -200, month: "May" },
  { sales: 3, leads: 175, month: "Jun" },
  { sales: 5, leads: 125, month: "Jul" }
]

const barLineAxes = [
  {
    key: "leads-axis",
    orient: "right",
    className: "leads",
    name: "CountAxis",
    ticks: 3,
    tickValues: [-200, -100, 0, 25, 50, 75, 100, 125, 150, 175, 200],
    tickFormat: d => d,
    label: "Leads"
  },
  {
    key: "sales-axis",
    orient: "left",
    className: "sales",
    name: "CountAxis",
    tickValues: [-7, -2, 0, 1, 2, 3, 4, 5, 6, 7],
    tickFormat: d => d,
    label: "Sales"
  }
]

export default (
  <div style={{ height: "300px" }}>
    <div style={{ position: "absolute" }}>
      <OrdinalFrame
        size={[500, 300]}
        data={testData}
        type={{
          type: "point",
          //In order to draw some marks as bars use customMark that returns rect or circle
          customMark: d => {
            if (d.rIndex === 1) {
              return <circle r={6} fill={"rgba(0, 162, 206)"} />
            }

            let height = 0
            let y = 0

            if (d.negative) {
              height = d.y - d.base
              y = -height
            } else {
              height = d.base - d.y
            }
            return (
              <rect
                height={height}
                width={20}
                x={-10}
                y={y}
                fill="rgba(179, 51, 29)"
              />
            )
          }
        }}
        connectorStyle={{ stroke: "rgba(0, 162, 206)", strokeWidth: 3 }}
        oAccessor={"month"}
        //rAccessor order should match the axes order
        rAccessor={["leads", "sales"]}
        multiAxis={true}
        style={() => ({ fill: "#b3331d", opacity: 1, stroke: "white" })}
        axes={barLineAxes}
        //only draw connectors for the data represented as circles in the customMark
        connectorType={d => {
          return d.rIndex !== 0 && d.rIndex
        }}
        pieceHoverAnnotation={[
          {
            type: "highlight",
            style: {
              stroke: "red",
              fill: "none",
              strokeWidth: 4,
              strokeOpacity: 0.5
            }
          },
          { type: "frame-hover" }
        ]}
        tooltipContent={d => {
          //Return to related tooltip value
          const bothValues = [
            <div style={{ color: "rgba(179, 51, 29)" }} key={"1"}>
              Leads: {d.leads}
            </div>,
            <div style={{ color: "rgba(0, 162, 206)" }} key="2">
              Sales: {d.sales}
            </div>
          ]
          const content = d.rIndex === 0 ? bothValues : bothValues.reverse()
          return (
            <div style={{ fontWeight: 900 }} className="tooltip-content">
              {content}
            </div>
          )
        }}
        //Render the pieces under the connectors to make the lines look right
        renderOrder={["pieces", "connectors"]}
        oLabel={true}
        margin={{ top: 10, bottom: 50, left: 60, right: 60 }}
      />
    </div>
  </div>
)

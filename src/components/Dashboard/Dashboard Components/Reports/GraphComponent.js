import React from 'react'

const GraphComponent = ({ charts }) => {
  return (
    <div className="container">
    {charts.length === 0 ? (
      "No reports yet"
    ) : (
      <table className="table">
        <thead>
          <tr>
            <th style={{color: "black"}} scope="col">Months</th>
            <th style={{color: "black"}} scope="col">Visits</th>
          </tr>
        </thead>
        <tbody>
          {charts.map(chart => (
            <tr key={chart.Id}>
              <td>{chart.Months}</td>
              <td>{chart.Visit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
  )
}

export default GraphComponent
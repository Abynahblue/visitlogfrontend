import React from "react";

const ReportsComponent = ({ reports }) => {

  return (
    <div className="container">
      {reports.length === 0 ? (
        "No reports yet"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Host</th>
              <th scope="col">Position</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Position</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.Id}>
                <td>{report.fullName}</td>
                <td>{report.email}</td>
                <td>{report.role}</td>
                <td>{report.phone}</td>
                {/* <td>
                  <Link to={`/ticket/${report.id}`}>See comments</Link>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsComponent;
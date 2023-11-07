import React from "react";

const VisitorsComponent = ({ visitors }) => {
  return (
    <div className="container">
      {visitors.length === 0 ? (
        "No reports yet"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th style={{color: "black"}} scope="col">Visitor</th>
              <th style={{color: "black"}} scope="col">Company</th>
              <th style={{color: "black"}} scope="col">Email</th>
              <th style={{color: "black"}} scope="col">Phone Number</th>
              <th style={{color: "black"}} scope="col">Host</th>
              <th style={{color: "black"}} scope="col">Time In</th>
              <th style={{color: "black"}} scope="col">Time Out</th>
              <th style={{color: "black"}} scope="col">Position</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(visitor => (
              <tr key={visitor.guest_id?._id}>
                <td>{visitor.guest_id.fullName}</td>
                <td>{visitor.guest_id.company}</td>
                <td>{visitor.guest_id.email}</td>
                <td>{visitor.guest_id.phone}</td>
                <td>{visitor.hostEmail}</td>
                <td>{new Date(visitor.sign_in).toLocaleString()}</td>
                <td>
    {(visitor.sign_out && visitor.sign_out.date !== null )
    ? new Date(visitor.sign_out.date).toLocaleString()
    : "Not signed out"}
</td>
    <td>{visitor.guest_id.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorsComponent;
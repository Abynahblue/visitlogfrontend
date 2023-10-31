import React from "react";

const VisitorsComponent = ({ visitors }) => {
console.log("visitors: ", visitors);
  return (
    <div className="container">
      {visitors.length === 0 ? (
        "No reports yet"
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Visitor</th>
              <th scope="col">Company</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Host</th>
              <th scope="col">Time In</th>
              <th scope="col">Time Out</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(visitor => (
              <tr key={visitor.guest_id.Id}>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorsComponent;
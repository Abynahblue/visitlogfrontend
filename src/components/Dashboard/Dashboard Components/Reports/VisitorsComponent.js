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
              <th scope="col">Visitor</th>
              <th scope="col">Company</th>
              <th scope="col">Email</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Host</th>
              <th scope="col">Time In</th>
              <th scope="col">Time Out</th>
              <th scope="col">Position</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map(visitor => (
              <tr key={visitor.guest_id.Id}>
                <td>{visitor.guest_id.fullName}</td>
                <td>{visitor.guest_id.company}</td>
                <td>{visitor.guest_id.email}</td>
                <td>{visitor.guest_id.phone}</td>
                <td>{visitor.user_id.fullName}</td>
                <td>{visitor.sign_in}</td>
                <td>{visitor.sign_out?.date ?? "Not signed out"}</td>
                <td>{visitor.user_id.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default VisitorsComponent;
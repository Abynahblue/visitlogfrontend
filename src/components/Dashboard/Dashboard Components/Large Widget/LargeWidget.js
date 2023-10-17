import { useEffect, useState } from 'react';
import './LargeWidget.css';
import axios from 'axios';

// Table for Signed In Visitors
const LargeWidget = () => {
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = async () => {
    const { data } = await axios.get('http://localhost:5010/api/v1/visitLogs');
    setVisitors(data.data);
    console.log(data);
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="large_widget_container">
      <span className="large_widget_title">Visitors</span>
      <table className="large_widget_table">
        <thead>
          <tr>
            <th>Signed In</th>
            <th>Visitor</th>
            <th>Host</th>
            <th>Signed Out</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((visitor, index) => (
            <tr key={index + "_visitor"}>
              <td>{visitor.sign_in}</td>
              <td className="visitor_column">
                <div className="">{visitor.guest_id.fullName}</div>
                <div className="visitor_company">{visitor.guest_id.company}</div>
              </td>
              <td>{visitor.user_id.fullName}</td>
              <td>{visitor.sign_out?.date ?? "Not signed out"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LargeWidget;

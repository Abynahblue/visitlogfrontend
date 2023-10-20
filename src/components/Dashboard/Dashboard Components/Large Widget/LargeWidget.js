import { useEffect, useState } from 'react';
import './LargeWidget.css';
import { API } from '../../../../api/axiosClient';

// Table for Signed In Visitors
const LargeWidget = () => {
  const [visitors, setVisitors] = useState([]);

  const fetchVisitors = async () => {
    const accessToken = localStorage.getItem("access_token")
    const { data } = await API.get('/visitLogs', { headers: { "Authorization": `Bearer ${accessToken}` } });
    console.log("datata: ", data)
    setVisitors(data.data);
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
              <td>{new Date(visitor.sign_in).toLocaleString()}</td>
              <td className="visitor_column">
                <div className="">{visitor.guest_id?.fullName}</div>
                <div className="visitor_company">{visitor.guest_id?.company}</div>
              </td>
              <td>{visitor.user_id?.fullName}</td>
              <td>{(visitor.sign_out && visitor.sign_out.date !== null )
              ? new Date(visitor.sign_out.date).toLocaleString()
              : "Not signed out"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LargeWidget;

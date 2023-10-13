import { useEffect, useState } from 'react';
import './Host.css';
import Navbar from '../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../Dashboard Components/Sidebar/Sidebar';
import axios from 'axios';

// Host Module 
const Host = () => {

  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const { data } = await axios.get('http://localhost:5010/api/v1/visitLogs');
    console.log(data);
    setVisitors(data?.data ?? []);
    console.log(data, "this is data")
  };


  return (
    <div className="host_container">
      <Navbar />
      <div className="host_wrapper">
        <Sidebar />
        <div className="host_content">
          <span className="host_content_title">Host Visitor Records</span>

          <form action="">
            <table>
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Host</th>
                  <th>Sign In</th>
                  <th>Sign Out</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map(visitlog => (
                  <tr>
                    <td className="visitor_column">
                      <div className="visitor_name">{visitlog.guest_id?.fullName}</div>
                    </td>
                    <td>{visitlog.user_id?.fullName}</td>
                    <td>{visitlog.sign_in}</td>
                    <td>{visitlog.sign_out?.date ?? "Not signed out"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Host;

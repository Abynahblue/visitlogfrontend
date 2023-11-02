import { useEffect, useState } from 'react';
import './Host.css';
import Navbar from '../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../Dashboard Components/Sidebar/Sidebar';
import { API } from '../../../../api/axiosClient';
// Host Module 
const Host = () => {

  const [visitors, setVisitors] = useState([]);

  useEffect(() => {
    fetchVisitors();
  }, []);

  const fetchVisitors = async () => {
    const accessToken = localStorage.getItem("access_token")
    const { data } = await API.get('/visitLogs', {headers: {"Authorization": `Bearer ${accessToken}`}});
    setVisitors(data?.data ?? []);
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
                  <tr key={visitlog?._id}>
                    <td className="visitor_column">
                      <div className="visitor_name">{visitlog.guest_id?.fullName}</div>
                    </td>
                    <td>{visitlog.hostEmail}</td>
                    <td>{new Date(visitlog.sign_in).toLocaleString()}</td>
                    <td>{(visitlog.sign_out && visitlog.sign_out.date !== null )
                    ? new Date(visitlog.sign_out.date).toLocaleString()
                    : "Not signed out"}</td>
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

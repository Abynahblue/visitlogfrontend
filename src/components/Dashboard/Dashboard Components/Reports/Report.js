import { useEffect, useState } from 'react';
import GeneratePDF from './GenerateReport';
import GenerateVisitorPDF from './GenerateVisitorReport';
import GenerateGraphPDF from './GraphReport'
import Navbar from '../Navbar/Navbar';
import { API } from '../../../../api/axiosClient';
import ReportsComponent from './ReportsComponent';
import VisitorsComponent from './VisitorsComponent';
import GraphComponent from './GraphComponent';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [visitors, setVisitors] = useState([])
  const [charts, setCharts] = useState([]) // new

  useEffect(() => {
    const getAllReports = async () => {
      try
      {
        const accessToken = localStorage.getItem("access_token")
        const response = await API.get('/user', { headers: { "Authorization": `Bearer ${accessToken}` } });
        setReports(response.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    getAllReports();
  }, []);

  //new
  useEffect(() => {
    const getVisitorsReport = async () => {
      try
      {
         const accessToken = localStorage.getItem("access_token")
        const response = await API.get('/visitLogs', { headers: { "Authorization": `Bearer ${accessToken}` } });
        setVisitors(response.data.data ?? []);
      } catch (err) {
        console.log(err);
      }
    };
    getVisitorsReport();
  }, []);

  useEffect(() => {
    const getChartReport = async () => {
      try {
        const response = await API.get('/monthly-visits');
        setCharts(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getChartReport();
  }, []);

  const reportTickets = reports.filter(report => report);

  const visitorsReport = visitors.filter(visitlog => visitlog)

  const graphReport = charts.filter(chart => chart)

  return (
    <div>
      <Navbar />
      <div className="">
        <div className="">
          <button
            className="btn btn-primary"
            onClick={() => GeneratePDF(reportTickets)}
          >
            Generate Employee Report
          </button>
          <button className='btn btn-success'><a href='mailto:someone@example.com'>Share through Email</a> </button>

          <ReportsComponent reports={reports} />
        </div>

        <div className="">
          <button className="btn btn-primary"
            onClick={() => GenerateGraphPDF(graphReport)}>Generate Graph Report</button>

            <GraphComponent charts={charts} />
        </div>

        <div className="">
          <button className="btn btn-primary"
            onClick={() => GenerateVisitorPDF(visitorsReport)}>Generate Visitors Report</button>

            <VisitorsComponent visitors={visitors} />
        </div>
      </div>
      
    </div>
  );
};

export default Report;

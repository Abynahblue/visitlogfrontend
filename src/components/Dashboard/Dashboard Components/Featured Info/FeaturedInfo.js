import './FeaturedInfo.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Small Widgets to display statistics of visitors
const FeaturedInfo = () => {
  const [charts, setCharts] = useState();

  const fetchChart = async () => {
    const { data } = await axios.get('http://127.0.0.1:5010/api/v1/monthly-visits');
    setCharts(data.data);
    console.log(data);
  };

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <div className="featuredInfo_container">
    {charts && charts.map((chart) => (
        <div className="featuredInfo_item">
          <span className="featuredInfo_title">Number of Visits</span>
          <div className="featuredInfo_money_container">
            <span className="featuredInfo_money"> { chart.Months } - </span>
            <span className="featuredInfo_money_rate negative"> {chart.Visit} </span>
          </div>
        </div>
        ))}
    </div>
  );
};

export default FeaturedInfo;

import './FeaturedInfo.css';
import { useEffect, useState } from 'react';
import { API } from '../../../../api/axiosClient';

// Small Widgets to display statistics of visitors
const FeaturedInfo = () => {
  const [charts, setCharts] = useState();

  const fetchChart = async () => {
    const { data } = await API.get('/monthly-visits');
    setCharts(data.data);
  };

  useEffect(() => {
    fetchChart();
  }, []);

  return (
    <div className="featuredInfo_container">
    {charts && charts.map((chart, index) => (
        <div className="featuredInfo_item" key  = {index + "_featuredInfo"}>
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

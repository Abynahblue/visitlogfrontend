import FeaturedInfo from '../../Dashboard Components/Featured Info/FeaturedInfo'
import Chart from '../../Dashboard Components/Chart/Chart'
import './Home.css'
import LargeWidget from '../../Dashboard Components/Large Widget/LargeWidget'

// Dashboard Homepage
const Home = () => {
  return (
    <div className='home'>
        <FeaturedInfo />
        <Chart title="Visitor Analytics" grid dataKey="numberOfVisitors" />
        <div className="home_widgets">
          <LargeWidget />
        </div>
    </div>
  )
}

export default Home
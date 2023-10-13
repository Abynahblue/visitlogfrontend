import React from 'react'
import './Sidebar.css'
import { Home,BarChart, AccountCircle, Save, VerifiedUser, ArrowBack, CropFree } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';

// Sidebar of Dashboard
const Sidebar = () => {
    const navigate = useNavigate()


  return (
    <div className='sidebar_container'>
        <div className='sidebar_wrapper'>
            <div className="sidebar_menu">
                <h3 className="sidebar_title">Dashboard</h3>
                <ul className="sidebar_list">
                    <li className="sidebar_list_item active" onClick={() => {
                        navigate('/dashboardPage')
                    }}>
                        <Home className='sidebar_icon'/>
                        Home
                    </li>
                    <li className="sidebar_list_item" onClick={() => {
                        navigate('/dashboardPage')
                    }}>
                        <BarChart className='sidebar_icon'/>
                        Statistics
                    </li>
                </ul>
            </div>

            <div className="sidebar_menu">
                <h3 className="sidebar_title">Account</h3>
                <ul className="sidebar_list">
                    <li className="sidebar_list_item" onClick={() => {
                        navigate('/host')
                    }}>
                        <AccountCircle className='sidebar_icon'/>
                        Host
                    </li>
                    <li className="sidebar_list_item" onClick={() => {
                        navigate('/admin')
                    }}>
                        <VerifiedUser className='sidebar_icon' />
                        Admin
                    </li>
                </ul>
            </div>

            <div className="sidebar_menu">
                <h3 className="sidebar_title">File Transfer</h3>
                <ul className="sidebar_list">
                    <li className="sidebar_list_item" onClick={() => {
                        navigate('/reports')
                    }}>
                        <Save className='sidebar_icon'/>
                        Reports
                    </li>
                    <li className="sidebar_list_item" onClick={() => {
                        navigate('/qrcode')
                    }}>
                        <CropFree className='sidebar_icon'/>
                        QRCode
                    </li>
                </ul>
            </div>

            <div className="sidebar_menu">
                <h3 className="sidebar_title">Go back</h3>
                <ul className="sidebar_list">
                    <li className="sidebar_list_item" onClick={() => {
                        navigate('/')
                    }}>
                        <ArrowBack className='sidebar_icon'/>
                        Guest
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
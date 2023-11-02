import React, { useState } from 'react'
import './Sidebar.css'
import { Home,BarChart, AccountCircle, Save, VerifiedUser, ArrowBack, CropFree } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';

// Sidebar of Dashboard
const Sidebar = () => {
    const [activeItem, setActiveItem] = useState(null)
    const navigate = useNavigate()

    const handleClick = (targetPath) => {
        setActiveItem(targetPath)
        navigate(targetPath);
    }


  return (
    <div className='sidebar_container'>
        <div className='sidebar_wrapper'>
            <div className="sidebar_menu">
                <h3 className="sidebar_title">Dashboard</h3>
                <ul className="sidebar_list">
                    <li className={`sidebar_list_item ${activeItem ==='/dashboardPage' ? 'active': ''}`} onClick={() => {
                        handleClick("/dashboardPage")
                    }}>
                        <Home className='sidebar_icon'/>
                        Home
                    </li>
                    <li className={`sidebar_list_item ${activeItem ==='/dashboardPage' ? 'active': ''}`} onClick={() => {
                        handleClick("/dashboardPage")
                    }}>
                        <BarChart className='sidebar_icon'/>
                        Statistics
                    </li>
                </ul>
            </div>

            <div className="sidebar_menu">
                <h3 className="sidebar_title">Account</h3>
                <ul className="sidebar_list">
                <li className={`sidebar_list_item ${activeItem ==='/host' ? 'active': ''}`} onClick={() => {
                        handleClick("/host")
                    }}>
                        <AccountCircle className='sidebar_icon'/>
                        Host
                    </li>
                    <li className={`sidebar_list_item ${activeItem ==='/adminPage' ? 'active': ''}`} onClick={() => {
                        handleClick("/adminPage")
                    }}>
                        <VerifiedUser className='sidebar_icon' />
                        Admin
                    </li>
                </ul>
            </div>

            <div className="sidebar_menu">
                <h3 className="sidebar_title">File Transfer</h3>
                <ul className="sidebar_list">
                   <li className={`sidebar_list_item ${activeItem ==='/reports' ? 'active': ''}`} onClick={() => {
                        handleClick("/reports")
                    }}>
                        <Save className='sidebar_icon'/>
                        Reports
                    </li>
                    <li className={`sidebar_list_item ${activeItem ==='/qrcode' ? 'active': ''}`} onClick={() => {
                        handleClick("/qrcode")
                    }}>
                        <CropFree className='sidebar_icon'/>
                        QRCode
                    </li>
                </ul>
            </div>

            <div className="sidebar_menu">
                <Link className="sidebar_title" to={'/'}>Go back</Link>
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
import React from 'react'
import './Navbar.css'
import { NotificationsNone, Settings } from '@material-ui/icons';
import User from '../../../../assets/user.png'

// Navigation bar
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="navbar_wrapper">
            <div className="navbar_left">
                <span className="logo">ViLog</span>
            </div>

            <div className="navbar_right">
                <div className="navbar_icons_container">
                    <NotificationsNone />
                    <span className="navbar_icon_badge">2</span>
                </div>

                <div className="navbar_icons_container">
                    <Settings />
                </div>
                <img src={User} alt="User" className='user_icon' />
            </div>
        </div> 
    </div>
  )
}

export default Navbar
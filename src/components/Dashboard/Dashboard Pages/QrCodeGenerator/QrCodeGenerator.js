import React, { useState } from 'react';
import {  Input } from '@material-ui/core';
import Navbar from '../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../Dashboard Components/Sidebar/Sidebar';
import './QrCodeGenerator.css';
import { Button, Center } from '@chakra-ui/react';
import { API } from '../../../../api/axiosClient';

const QrCodeGenerator = () => {
  const [qr, setQr] = useState('');
  const [msg, setMsg]= useState('');
  const [guestEmail, setguestEmail] = useState('');
  const handleChange = event => {
    setguestEmail(event.target.value);
  };
  const handleSumbit = event => {
    event.preventDefault()
    
    const accessToken = localStorage.getItem("access_token")
    API.post('/guest/generateQrCode', { email: guestEmail }, { headers: { "Authorization": `Bearer ${accessToken}` }}).then(response => {
      setQr(response.data.data.qrCode)
      setMsg(response.data.data.message)
    }) ;
  }
  console.log(qr);

 
  return (
    <div className="qrcode_container">
      <Navbar />
      <div className="qrcode_wrapper">
        <Sidebar />
        <div className="qrcode_content">
          <form onSubmit={handleSumbit}>
          <p style={{textAlign: 'center', fontWeight: 'bold', fontSize: '20px' }}>
              QR Code Generator
            </p>
          <Center display="flex" flexDirection="row">
            

            <div style={{ marginTop: 30 }}>
              <Input
              className='textarea_container'
                aria-label="empty textarea"
                placeholder="guest email"
                type="email"
                style={{ width: 380 }}
                value={guestEmail}
                onChange={handleChange}
              />
            <Button style={{ height: 52, marginLeft: 5 }} type='submit'  className='textarea_container'> Send </Button>
            </div>
            
          </Center>

          </form>
          <Center display="flex" flexDirection="column">
            <div>
              <img alt='qr code' src={qr} />
            </div>
            <p>{msg}</p>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;

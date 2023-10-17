import React, { useState } from 'react';
import { Fab, TextareaAutosize, Grid, Input } from '@material-ui/core';
import Navbar from '../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../Dashboard Components/Sidebar/Sidebar';
import './QrCodeGenerator.css';
import { Button, Center } from '@chakra-ui/react';
import axios from 'axios';

const QrCodeGenerator = () => {
  const [qr, setQr] = useState('');
  const [msg, setMsg]= useState('');
  const [guestEmail, setguestEmail] = useState('');
  const handleChange = event => {
    setguestEmail(event.target.value);
  };
  const handleSumbit = event => {
    event.preventDefault()
    axios.post('http://localhost:5010/api/v1/guest/generateQrCode', { email: guestEmail }).then(response => {
      console.log("dataaaa:",response.data);
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

import React, { useState } from 'react';
import { Fab, TextareaAutosize, Grid } from '@material-ui/core';
import Navbar from '../../Dashboard Components/Navbar/Navbar';
import Sidebar from '../../Dashboard Components/Sidebar/Sidebar';
import './QrCodeGenerator.css';
import { GetApp } from '@material-ui/icons';
import QRcode from 'qrcode.react';
import { Button, Center } from '@chakra-ui/react';

const QrCodeGenerator = () => {
  const [qr, setQr] = useState('');
  const handleChange = event => {
    setQr(event.target.value);
  };

  console.log(qr)

  const downloadQR = () => {
    const canvas = document.getElementById('myqr');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'myqr.png';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qrcode_container">
      <Navbar />
      <div className="qrcode_wrapper">
        <Sidebar />
        <div className="qrcode_content">
          <Center display="flex" flexDirection="column">
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
              QR Code Generator
            </span>

            <div style={{ marginTop: 30 }}>
              <TextareaAutosize
              className='textarea_container'
                aria-label="empty textarea"
                placeholder="Empty"
                style={{ width: 380 }}
                value={qr}
                onChange={handleChange}
              />
            </div>

            <div>
              {qr ? (
                <QRcode id="myqr" value={qr} size={320} includeMargin={true} />
              ) : (
                <p style={{ marginTop: '20px' }}>No QR code preview</p>
              )}
            </div>

            <div>
              {qr ? (
                <Grid container>
                  <Grid item xs={10}>
                    <TextareaAutosize
                      style={{
                        fontSize: 18,
                        width: 280,
                        height: 100,
                        border: '1px solid black',
                        padding: '5px',
                      }}
                      rowsMax={4}
                      defaultValue={qr}
                      value={qr}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Fab onClick={downloadQR} color="primary">
                      <GetApp />
                    </Fab>
                  </Grid>
                  <Button
                    variant="contained"
                    backgroundColor="#3bb077"
                    color="white"
                  >
                    {' '}
                    <a href="mailto:someone@example.com"> Email </a>
                  </Button>
                </Grid>
              ) : (
                ''
              )}
            </div>
          </Center>
        </div>
      </div>
    </div>
  );
};

export default QrCodeGenerator;

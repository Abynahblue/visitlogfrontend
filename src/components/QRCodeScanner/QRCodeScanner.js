import { TextareaAutosize } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import QrScan from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

const QRCodeScanner = () => {
  const [qrscan, setQrscan] = useState('');
  const toast = useToast()
  const navigate = useNavigate()
  const handleScan = data => {
    if (data) {
      setQrscan(data.data);
    }
  };
  const handleError = err => {
    console.error(err);
  };

  const qrcodeArr = qrscan.split('\n')

  const visitorData = {
    email: qrcodeArr[0],
    password: qrcodeArr[1],
    position: 'Visitor',
    host: 11,
    timestamp: new Date(Date.now()).toISOString()
  }

  
  const handleSubmit = async () => {
    try {
      const {data} = await axios.post("/http://localhost:5010/api/v1/guest/generateQrcode", visitorData)
      console.log(data)

      if (data) {
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        });
        navigate('/signedIn');
      }
    } catch(error) {
      toast({
        title: 'Failed login',
        description: error.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    }
    
  };

  handleSubmit();
    

  return (
    <div>
      <center>
        <span style={{fontSize: 20, fontWeight: 'bold'}}>QR Scanner</span>
      </center>

      <center>
        <div style={{ marginTop: 30 }}>
          <QrScan
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ height: 240, width: 350 }}
          />
        </div>
      </center>

      <center>
        <TextareaAutosize
          style={{ fontSize: 18, width: 320, height: 100, marginTop: 130, border: '2px solid rgb(253, 130, 92)', padding: '5px' }}
          rowsMax={4}
          defaultValue={qrscan}
          value={qrscan}
          placeholder="Empty"
        />
      </center>
    </div>
  );
};

export default QRCodeScanner;

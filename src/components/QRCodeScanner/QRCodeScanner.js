import { TextareaAutosize } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import QrScan from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { Button } from 'react-bootstrap';
import { API } from '../../api/axiosClient';
import { toast } from 'react-toastify';

const QRCodeScanner = () => {
  const [qrscan, setQrscan] = useState(null);
  const navigate = useNavigate()
  
  const handleScan = data => {
    console.log("Scanned data: ", data)
    if (data)
    {
      setQrscan(JSON.parse(data));
    }
  };

  useEffect(() => {
    if (qrscan && qrscan.email && qrscan.password )
    {

      navigate({pathname:`/visitorLogin`},{state: qrscan})

    } else if (qrscan && qrscan.visitLogId)
    {
      API.put("/guest/logout", qrscan).then((response) => {
        console.log(response);
        setTimeout(() => {
          toast.success("Guest logged out successfully")
          navigate("/visitorPage")
        }, 1000)
       })
    } 
  },[qrscan, navigate])
  const handleError = err => {
    console.log(err);
  };

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

    </div>
  );
};

export default QRCodeScanner;

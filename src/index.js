import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

try {
  ReactDOM.render(
    <StrictMode>
      <ColorModeScript />
        <App />
    </StrictMode>,
    document.getElementById('root')
  );
  
} catch (error) {
  console.error(error)
}

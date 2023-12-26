import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './font.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/NeueHaasDisplayBlack.ttf'
import './fonts/NeueHaasDisplayBlackItalic.ttf'
import './fonts/NeueHaasDisplayRoman.ttf'
import './fonts/NeueHaasDisplayRomanItalic.ttf'
import './fonts/NeueHaasDisplayBold.ttf'
import './fonts/NeueHaasDisplayBoldItalic.ttf'
import './fonts/NeueHaasDisplayLight.ttf'
import './fonts/NeueHaasDisplayLightItalic.ttf'
import './fonts/NeueHaasDisplayMediu.ttf'
import './fonts/NeueHaasDisplayMediumItalic.ttf'
import './fonts/NeueHaasDisplayThin.ttf'
import './fonts/NeueHaasDisplayThinItalic.ttf'
import './fonts/NeueHaasDisplayXThin.ttf'
import './fonts/NeueHaasDisplayXThinItalic.ttf'
import './fonts/NeueHaasDisplayXXThin.ttf'
import './fonts/NeueHaasDisplayXXThinItalic.ttf'

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

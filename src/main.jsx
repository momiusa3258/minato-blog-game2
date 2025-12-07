import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom';

import App from './App.jsx'
import './css/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* App全体を HashRouter で包む */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
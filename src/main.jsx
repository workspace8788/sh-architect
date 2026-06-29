import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

const baseName = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '')
const redirectPath = new URLSearchParams(window.location.search).get('redirect')

if (redirectPath && baseName) {
  window.history.replaceState(null, '', `${baseName}${redirectPath}`)
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={baseName}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)

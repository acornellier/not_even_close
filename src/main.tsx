import ReactDOM from 'react-dom/client'
import './globals.css'
import TagManager from 'react-gtm-module'
import { App } from './App'
// import { StrictMode } from 'react'

if (process.env.NODE_ENV === 'production')
  TagManager.initialize({ gtmId: 'G-VZFWC5SP1E' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
)

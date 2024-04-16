import ReactDOM from 'react-dom/client'
import './globals.css'
import TagManager from 'react-gtm-module'
import { App } from './App'
// import { StrictMode } from 'react'

if (process.env.NODE_ENV === 'production')
  TagManager.initialize({ gtmId: 'G-0XXET0NQC8' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
)

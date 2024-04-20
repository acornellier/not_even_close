import ReactDOM from 'react-dom/client'
import './globals.css'
import TagManager from 'react-gtm-module'
import { App } from './App'
// import { StrictMode } from 'react'

// if (process.env.NODE_ENV === 'production')
console.log('hi')
TagManager.initialize({ gtmId: 'G-N6CRB9B3CL' })

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
)

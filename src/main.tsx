import './style.css'
import { setupCounter } from './counter.ts'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import CssBaseline from '@mui/material/CssBaseline'

const root = ReactDOM.createRoot(document.getElementById('app')!)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>
)

const counterButton = document.querySelector<HTMLButtonElement>('#counter')
if (counterButton) {
  setupCounter(counterButton)
}

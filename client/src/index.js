import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'
import WebSocketProvider from '../src/components/Websocket/WebSocket'

import './i18n'

import { GoogleOAuthProvider } from '@react-oauth/google'




  const container = document.getElementById('root')
  const root = ReactDOM.createRoot(container)
  root.render(
    <GoogleOAuthProvider clientId="197031847913-ikgmujluer7f5bjng4bfpee43hsipl1q.apps.googleusercontent.com">
      <React.StrictMode>
        <Provider store={store}>
          <WebSocketProvider>
            <App />
          </WebSocketProvider>
        </Provider>
      </React.StrictMode>
    </GoogleOAuthProvider>
  )
}

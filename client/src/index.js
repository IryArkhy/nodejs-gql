import React from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import App from './components/App'
import client from './client'
import './index.css'

const Root = () => (
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
)



const root = createRoot(document.getElementById('app')); 

root.render(<Root />)

if (module.hot) {
  module.hot.accept()
}

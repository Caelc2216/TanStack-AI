import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient: QueryClient = new QueryClient() // This is where the cache lives


// LESSON STAGE 1: Add QueryClient and QueryClientProvider here.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)

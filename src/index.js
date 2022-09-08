import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter } from 'react-router-dom';
import theme from './theme';

const serverUrl = "https://zdllxocq2aqh.usemoralis.com:2053/server";
const appId = "J5pnrUqA2XQlmAZVjOlcEl1XbqjkHqMjNdsJs5pU";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoralisProvider serverUrl={serverUrl} appId={appId}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>  
          <App />
        </BrowserRouter>  
      </ChakraProvider>
    </MoralisProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

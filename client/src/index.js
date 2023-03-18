import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import {ApolloClient,ApolloProvider,InMemoryCache} from "@apollo/client"
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import { AppContextProvider } from './context/appContext';

const client=new ApolloClient({
  uri:"https://books-and-authors-api.onrender.com/graphql",
  cache:new InMemoryCache()
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <AppContextProvider>
        <Router>
          <Routes>
            <Route path="/*" element={<App/>}/>
          </Routes>
        </Router>
      </AppContextProvider>
    </ApolloProvider>
  </React.StrictMode>
);


import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

import './App.css';

const App = () => {
  let [footerContent, setFooterContent] = useState(null);

  return (
    <BrowserRouter>
      <div id="app" className="App">
        <Header gameStarted={false}/>
        <Main setFooter={setFooterContent} />
        <Footer content={footerContent} />
      </div>
    </BrowserRouter>
  );
};

export default App;

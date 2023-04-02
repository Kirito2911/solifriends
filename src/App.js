import logo from './logo.svg';
import './App.css';
import Mainform from './components/Mainform';
import { useState } from 'react';
import { Link, Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Pessoas from './components/Pessoas';


function App() {

  return (
    <div className="container">
      
      <Router>
          <div>
            <div className='toolbar'>
              <Link className='link' to="/" style={{color:"white", textDecoration:"none"}}>Home</Link>
              <Link className='link' to="/cadastro" >Cadastro</Link>
              <Link className='link' to="/pessoas" >Pessoas</Link>
            </div>
          
           
            <Routes>
              <Route path="/cadastro" element={<div className='linkContainer'><Mainform /></div>}>
              </Route>
              <Route path="/cadastro/:id" element={<div className='linkContainer'><Mainform /></div>}>
              </Route>
              <Route path="/" element={<div className='linkContainer'>Home
                <img src={logo} className="App-logo" alt="logo" />
                </div>}>
              </Route>
              <Route path="/pessoas" element={<div className='linkContainer'><Pessoas /></div>}>
              </Route>
            </Routes>
          </div>
        </Router>
        

      
    </div>
  );
}

export default App;

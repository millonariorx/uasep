import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/login';
import logo from './logo.svg';
import './App.css';
import AdminAreas from './admon/AdminAreas';
import AdminUsers from './admon/AdminUsers';
import RegisterIdeas from './dependencias/RegisterIdeas';
import RegisterImplementedIdeas from './dependencias/RegisterImplementedIdeas';
import EvaluationTable from './dependencias/EvaluationTable';
import IdeaEvaluationAndImpact from './dependencias/IdeaEvaluationAndImpact';
import TiempoImplement from './dependencias/TiempoImplement';
import IndicatorDashboard from './admon/IndicatorDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/administrador" element={<AdminAreas />} />
          <Route path="/administradorUser" element={<AdminUsers />} />
          <Route path="/dependencias" element={<RegisterIdeas />} /> 
          <Route path="/Implementadas" element={<RegisterImplementedIdeas />} />
          <Route path="/tablas" element={<EvaluationTable />} />
          <Route path="/tablasinpacto" element={<IdeaEvaluationAndImpact />} />
          <Route path="/tablastiempo" element={<TiempoImplement />} />
          <Route path="/indicadores" element={<IndicatorDashboard />} />
          <Route path="/" element={
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Edit <code>src/App.js</code> and save to reload.
              </p>
              <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn React
              </a>
            </header>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

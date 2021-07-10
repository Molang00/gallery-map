import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainLayout from './layout/mainLayout/mainLayout';

const App: React.FC = () => {
  return (
    <div className="App">
      <MainLayout />
    </div>
  );
};

export default App;

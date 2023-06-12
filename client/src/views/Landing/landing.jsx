import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h1>BIENVENIDOS A DRIVERS F1</h1>
      <Link to="/home">Ingresar al sitio</Link>
    </div>
  );
};

export default Landing;


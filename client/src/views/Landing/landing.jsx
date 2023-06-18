import React from 'react';
import { Link } from 'react-router-dom';
import video from '../../../src/assets/champions.mp4';
import styles from './landing.module.css';

const Landing = () => {
  return (
    <div>
      <div className={styles.linkContainer}>
        <Link to="/home" className={styles.link}>
          Ingresar al sitio
        </Link>
      </div>
    </div>
  );
};

export default Landing;


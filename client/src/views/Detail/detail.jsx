import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "./detail.module.css";
const noImage = "https://i.imgur.com/Ks7SbZt.png"

function Detail() {
  const { id } = useParams();
  const [driver, setDriver] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const data = response.data;
        
        if (Object.keys(data).length === 0) {
          setDriver(null);
        } else {
          setDriver(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [id]);

  const formatTeams = (teams) => {
  
    if (typeof teams === 'string') {
      // Si es un string, ya está en el formato deseado
      return teams;
    } else if (Array.isArray(teams)) {
      // Si es un array de objetos, convertirlo a cadena separada por comas
      return teams.map(team => team.name).join(', ');
    } else {
      // Otros casos, retornar cadena vacía
      return '';
    }

  };
 
  return (
    <div className={styles.detailContainer}>
      <Link to="/home" className={styles.closeButton} title="Close Card">
         <span role="img" aria-label="Foto" className={styles.imgIcon}>&#10005;</span>
        </Link>
      {driver && Object.keys(driver).length !== 0 ? (
        <>
        <h3 className={styles.id}>{`${driver.id}`}</h3>
          {driver.name ? (
            <h3 className={styles.nombre}>{`${driver.name.forename} ${driver.name.surname}`}</h3>
          ) : (
            <h3>{`${driver.forename} ${driver.surname}`}</h3>
          )}
          <h5 className={styles.nacionalidad}>{`${driver.nationality}`}</h5>
          <img src={driver.image.url || noImage} alt="Driver" className={styles.imagen} />
          <h5 className={styles.descripcion}>{`${driver.description}`}</h5>
          <h5>{`${driver.dob}`}</h5>
          {driver.teams ? (
            <h5 className={styles.teams}>{formatTeams(driver.teams)}</h5>
          ) : (
            driver.Teams && (
              <h5 className="teams">{formatTeams(driver.Teams)}</h5>
            )
          )}
          
        </>
      ) : (
        <p>No se encontró el conductor</p>
      )}
    </div>
  );
  
}

export default Detail;

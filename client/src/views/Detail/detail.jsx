import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from "./detail.module.css";
const noImage = "https://i.imgur.com/Ks7SbZt.png"

function Detail() {
  const { id } = useParams();
  const [driver, setDriver] = useState({});

  useEffect(() => {
    let formattedData={}
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/drivers/${id}`);
        const data = response.data;
   
        if (Object.keys(data).length === 0) {
          setDriver(null);
        } else {
          if (data.createInDb) {
             formattedData = {
              ...data,
              image: data.image
            };
          } else {
            formattedData = {
              ...data,
              image: data.image.url
            };
          }
          setDriver(formattedData);
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [id]);

  const formatTeams = (teams) => {
    if (typeof teams === 'string') {
      return teams;
    } else if (Array.isArray(teams)) {
      return teams.map(team => team.name).join(', ');
    } else {
      return '';
    }
  };
  const deleteHandler = async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/drivers/${id}`);
      history.push("/home");
    } catch (error) {
      
    }
  }

  return (
    <div className={styles.detailContainer}>
      {driver.createInDb ? (
      <button className={styles.deleteButton} onClick={deleteHandler}>
          <span title='Delete the Driver from the database' role="img" aria-label="Foto" className={styles.imgIcon}>🗑️</span>
        </button>
      ) : (
        <button className={styles.deleteButton}  disabled>
          <span title='Cannot delete, belongs to API' role="img" aria-label="Foto" className={styles.imgIcon}>🗑️</span>
        </button>
      )}
  
      <Link to="/home/update" className={styles.updateButton} title="Update Driver">
         <span role="img" aria-label="Foto" className={styles.imgIcon}>↻</span>
      </Link>
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

          <img
            src={driver.image || noImage}
            alt="Driver"
            className={styles.imagen}
          />

          {driver.description ? (
            <h5 className={styles.descripcion}>{`${driver.description}`}</h5>
          ) : (
            <h5 className={styles.descripcion}>{`This driver has no description`}</h5>
          )}

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


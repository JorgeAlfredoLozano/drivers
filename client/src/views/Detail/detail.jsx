import axios from 'axios';
import { getDrivers } from '../../redux/actions/index';
import { useEffect, useState } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import styles from "./detail.module.css";
import { useDispatch } from 'react-redux';

const noImage = "https://i.imgur.com/Ks7SbZt.png"


function Detail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [driver, setDriver] = useState({});

  /* TRAIGO LOS DATOS DEL DRIVER CON EL ID */
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
        // console.error(error);
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

  /* HANDLER PARA ELIMINAR UN DRIVER CREADO POR DB */
  const deleteHandler = async () => {
    const response = await axios.delete(`http://localhost:3001/drivers/${id}`);
    if (response.status === 200) {
      await dispatch(getDrivers());
      
      alert("the driver was removed")
      history.push("/home");
    }
  }

  return (
    <div className={styles.detailContainer}>
      {/* BOTON ELIMINAR SI VIENE DE LA DB */}
      {driver.createInDb ? (
      <button className={styles.deleteButton} onClick={deleteHandler}>
          <span title='Delete the Driver from the database' role="img" aria-label="Foto" className={styles.imgIcon}>🗑️</span>
        </button>
      ) : (
        <button className={styles.deleteButton}  disabled>
          <span title='Cannot delete, belongs to API' role="img" aria-label="Foto" className={styles.imgIcon}>🗑️</span>
        </button>
      )}

      {/* BOTON PARA ACTUALIZAR SI VIENE DE LA DB */}
      {driver.createInDb ?(<Link to={`/update/${driver.id}`} className={styles.updateButton} title="Update Driver">
         <span role="img" aria-label="Foto" className={styles.imgIcon}>↻</span>
      </Link>):(<button className={styles.updateButton}  title='update info of driver' disabled>
         <span role="img" aria-label="Foto" className={styles.imgIcon} title='update info of driver' disabled>↻</span>
      </button>)}
      
      {/*BOTON PARA CERRAR EL DETAIL */}
      <Link to="/home" className={styles.closeButton} title="Close Card">
         <span role="img" aria-label="Foto" className={styles.imgIcon}>&#10005;</span>
      </Link>
      
      {/* DETALLES DEL DRIVER */}
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
        <p>Loading Driver...</p>
      )}
    </div>
  );
}

export default Detail;


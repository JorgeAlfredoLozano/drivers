import styles from "./cards.module.css";

import { NavLink } from "react-router-dom";

function Cards({ driver }) {
  const { forename,surname,image,teams,dob,id } = driver;
  
  const formatTeams = (teams) => {
    if (typeof teams === 'string') {
      // Si es un string, ya está en el formato deseado
      return teams;
    } else if (Array.isArray(driver.Teams)) {
      // Si es un array de objetos, convertirlo a cadena separada por comas
      return driver.Teams.map(team => team.name).join(', ');
    } else {
      // Otros casos, retornar cadena vacía
      return '';
    }

  };
  return (
    <div className={styles.card_container} title={`Click here to see more details of ${driver.forename} ${driver.surname}`}>
      <NavLink
        to={`/home/${id}`}
        style={{ textDecoration: "none"}}
      >
        <h3 className={styles.nombre}>{`${forename} ${surname}`}</h3>
        <img src={image} alt="Driver" className={styles.image} />
        <div>
        <h5 className={styles.teams}>{formatTeams(teams)}</h5>
        <h5 className={styles.fecha}>{dob}</h5>
        </div>
        
      </NavLink>
    </div>
  );
}

export default Cards;

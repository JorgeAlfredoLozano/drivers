import styles from "./cards.module.css";
const noImage = "https://i.imgur.com/Ks7SbZt.png"
import { NavLink } from "react-router-dom";

function Cards({ driver }) {
  const { forename,surname,image,teams,dob,id } = driver;
  
  const formatTeams = (teams) => {
    if (typeof teams === 'string') {
        return teams;
    } else if (Array.isArray(driver.Teams)) {
        return driver.Teams.map(team => team.name).join(', ');
    } else {
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
        <img src={driver.image || noImage} alt="Driver" className={styles.image} />
        <div>
        <h5 className={styles.teams}>{formatTeams(teams)}</h5>
        <h5 className={styles.fecha}>{dob}</h5>
        </div>
        
      </NavLink>
    </div>
  );
}

export default Cards;

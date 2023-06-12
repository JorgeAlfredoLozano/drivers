import "./cards.styles.css";

import { NavLink } from "react-router-dom";

function Cards({ driver }) {
  const { forename,surname,image,teams,dob,id } = driver;
  
  return (
    <div className="card-container" title={`Click here to see more details of ${driver.forename} ${driver.surname}`}>
      <NavLink
        to={`/home/${id}`}
        style={{ textDecoration: "none"}}
      >
        <h3>{`${forename} ${surname}`}</h3>
        <img src={image} alt="Driver" className="image" />
        <div>
        <h5 className="teams">{teams}</h5>
        <h5>{dob}</h5>
        </div>
        
      </NavLink>
    </div>
  );
}

export default Cards;

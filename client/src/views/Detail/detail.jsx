import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './detail.styles.css';
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

  return (
    <div>
      {driver && Object.keys(driver).length !== 0 ? (
        <>
        <h5>{`${driver.id}`}</h5>
          <h3>{`${driver.name.forename} ${driver.name.surname}`}</h3>
          <h5>{`${driver.nationality}`}</h5>
          <img src={driver.image.url || noImage} alt="Driver" className="image" />
          <h5>{`${driver.description}`}</h5>
          <h5>{`${driver.dob}`}</h5>
          <h5 className="teams">{driver.teams}</h5>
          
        </>
      ) : (
        <p>No se encontró el conductor</p>
      )}
    </div>
  );
  
}

export default Detail;

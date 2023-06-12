import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from './create.module.css';
const noImage = "https://i.imgur.com/Ks7SbZt.png"

function Create() {
  // const driver = useSelector(state => state.drivers)
  const teams = useSelector((state) => state.teams);
  const [selectedTeam, setSelectedTeam] = useState("");
  const teamInputRef = useRef(null);

  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: ""
  })

  const handlerAddTeam = (event) => {
    event.preventDefault();
    const team = teamInputRef.current.value;
    if (team && !team.includes(teams)) {
      setSelectedTeam(selectedTeam + ", " + team);
      teamInputRef.current.value = "";
    }
  };

  const imageUrlChange = () => {
    const url = document.getElementById("imageUrlInput").value
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    alert(url)
    if (regex.test(url)) {
      setNewDriver({ ...newDriver, image: url });
    } else {
      setNewDriver({ ...newDriver, image: "" });
      /* Error */
    }
  }
  

  return (
    <div className={styles.container}>

      <div className={styles.sidebar}>
      <h1 style={{ marginTop: "-25px", color: "white" }}>Create New Driver</h1>
        <div className={styles.campoImagen}>
          {!newDriver.image && <img src={noImage} alt="No image" />}
          {newDriver.image && <img src={newDriver.image} alt="Pic Driver" />}
        </div>
      </div>

      <div className={styles.main}>
      <form className={styles.form}>
        
        <div className={styles.formField}>
          <label htmlFor="">Image URL:</label>
          <input type="text" title="URL" onChange={imageUrlChange} id="imageUrlInput"/>
        </div>
        <div className={styles.formField}>
          <label htmlFor="">Surname: </label>
          <input type="text" />
          <label htmlFor="">Forename: </label>
          <input type="text" />
        </div>
        <div className={styles.formField}>
          <label htmlFor="">Dob: </label>
          <input type="text" />
        </div>
        <div className={styles.formField}>
          <label htmlFor="">Description: </label>
          <textarea rows="8" cols="100" readOnly />
        </div>
        <div>
          <label htmlFor="">Teams:</label>
          <input
            type="text"
            placeholder="Team"
            ref={teamInputRef}
          />
          <button onClick={handlerAddTeam}>add</button>  
          <textarea name="" id="" cols="50" rows="3" value={selectedTeam}></textarea>
        </div>


        <div>
          <button type="button">Save</button>
          <button type="button">Cancel</button>
        </div>
      </form>
      </div>
      
    </div>
  );
}

export default Create;


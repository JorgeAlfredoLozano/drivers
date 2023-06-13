import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styles from './create.module.css';
import { validate } from './validations';
const noImage = "https://i.imgur.com/Ks7SbZt.png"

function Create() {
  const teams = useSelector((state) => state.teams);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [customTeam, setCustomTeam] = useState("");
  const teamInputRef = useRef(null);

  const [newDriver, setNewDriver] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: []
  })

  const [errors, setErrors] = useState({
    forename: "Forename is required",
    surname: "Surname is required",
    description: "Description is required",
    image: "Image is reduired",
    nationality: "Nationality is required",
    dob: "Dob is required",
    teams: ""
  })

  const handlerAddTeam = (event) => {
    event.preventDefault();
    const team = teamInputRef.current.value || customTeam;
    
    if (team && !newDriver.teams.includes(team)) {
      setSelectedTeam([...selectedTeam, team]);
      setCustomTeam("");
      teamInputRef.current.value = "";
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setNewDriver((prevState) => ({
      ...prevState,
      [name]: value
    }))

    const updatedErrors = validate({
      ...newDriver,
      [name]: value
    });
   
    setErrors(updatedErrors);
  }

  const handleTeamChange = (event) => {
    const selectedDriver = event.target.value;
    const isDuplicate = newDriver.teams.includes(selectedDriver);

    if (!isDuplicate) {
      setNewDriver((prevState) => ({
        ...prevState,
        teams: [...prevState.teams, selectedDriver]
      }));

      setSelectedTeam((prevState) => [...prevState, selectedDriver]);
    }
  };

  const handleCustomTeamChange = (event) => {
    setCustomTeam(event.target.value);
  };
  
  const imageUrlChange = () => {
    const url = document.getElementById("imageUrlInput").value
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (regex.test(url)) {
      setNewDriver({ ...newDriver, image: url });
      setErrors(prevErrors => ({
        ...prevErrors,
        image: ""
      }));
    } else {
      setNewDriver({ ...newDriver, image: "" });
      setErrors(prevErrors => ({
        ...prevErrors,
        image: "Invalid URL, please correct"
      }));
    }
  }

  const handleUndo = (event) => {
    event.preventDefault();
    
    if (selectedTeam.length > 0) {
      const updatedTeam = selectedTeam.slice(0, -1);
      setSelectedTeam(updatedTeam);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h2 style={{ marginTop: "-5px", color: "white" }}>Create New Driver</h2>
        <div className={styles.campoImagen}>
          {!newDriver.image && <img src={noImage} alt="No image" />}
          {newDriver.image && <img src={newDriver.image} alt="Pic Driver" />}
        </div>
        <div className={styles.formField}>
            <label styles={{color:"white"}}>Image URL:</label>
            <input type="text" title="URL" onChange={imageUrlChange} id="imageUrlInput"/>
            {errors.image ? (
              <span className={styles.errorIcon} title={errors.image}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>
      </div>

      <div className={styles.main}>
        <form className={styles.form}>
        <h2 style={{ marginTop: "-5px", marginBottom:"35px", color: "white" }}></h2>

          <div className={styles.formField}>
            <label style={{marginLeft:"0px"}}>Forename: </label>
            <input style={{width:"150px"}} name="forename" type="text" onChange={handleChangeInput}/>
            {errors.forename ? (
              <span className={styles.errorIcon} title={errors.forename}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
            <label style={{marginLeft:"5px"}}>Surname: </label>
            <input style={{width:"120px"}} name="surname" type="text" onChange={handleChangeInput}/>
            {errors.surname ? (
              <span className={styles.errorIcon} title={errors.surname}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          {/* </div>
        
          <div className={styles.formField}> */}
            <label >Dob: </label>
            <input style={{width:"75px"}} name="dob" type="text" onChange={handleChangeInput}/>
            {errors.dob ? (
              <span className={styles.errorIcon} title={errors.dob}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formField}>Description: </label>
            <textarea style={{width:"75%", height:"90px"}} name="description" cols="100" onChange={handleChangeInput}/>
            {errors.description ? (
              <span className={styles.errorIcon} title={errors.description}>
                {'\u274C'}
              </span>
            ) : (
              <span className={styles.validIcon}>✅</span>
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formField} style={{marginLeft:"-46px", marginTop:"23px"}}>Teams:</label>
            <select
              name="teams"
              value={newDriver.teams}
              onChange={handleTeamChange}
              className={styles.formField}
            >
              <option value="">Select teams</option>
              {teams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
            {/* <button onClick={handlerAddTeam}>Add</button>   */}
            <label className={styles.formField} style={{marginLeft:"10px", marginTop:"23px"}}>Custom Team:</label>
            <input type="text" ref={teamInputRef} value={customTeam} onChange={handleCustomTeamChange} />
            <button onClick={handlerAddTeam} className={styles.btnIcono} style={{marginLeft:"40px", marginTop:"8px"}}>+</button>
            </div>
            <div>
              <textarea
                style={{marginLeft:"100px", width:"69%", height:"40px"}}
                value={selectedTeam.join(", ")}
                readOnly
              />
              <button className={styles.btnIcono} onClick={handleUndo}>{'\u21A9'}</button>

              {!selectedTeam.length ? (
                <span className={styles.errorIcon} title="No teams selected, one required">
                  {'\u274C'}
                </span>
              ) : (
                <span className={styles.validIcon}>✅</span>
              )}
          </div>

          <div>
            <button className={styles.boton} type="button">Save</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;


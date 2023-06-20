import styles from './searchbar.module.css';
import { useState } from 'react';

function SearchBar({ onSearch, isChecked, handleCheckboxChange }) { // Recibe el estado del checkbox y la función de cambio como props
  const [name, setName] = useState("");

  /* HANDLER PARA EL SEARCH CON EL CHEKED DE ALL DRIVERS */
  const handleSearch = (event) => {
    event.preventDefault();
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s']+$/;
    if (regex.test(name)) {
      onSearch(name, isChecked ? "all" : "df");
      setName("");
    } else {
      alert("Invalid input");
    }
  };

  /* HANDLER PARA CAMBIOS EN EL INPUT */
  const handleChange = (event) => {
    setName(event.target.value);
  };

  /* HANDLER PARA CAPTURAR EL ENTER */
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div className={styles['search-container']}>
      <form className={styles['search-box']}>
        
        {/*INPUT DEL SEARCH */}
        <input
          placeholder="Search"
          type='search'
          value={name}
          className={styles['input']}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        {/*BOTON DE BUSCAR */}
        <button
          className={styles['buttonLink']}
          onClick={handleSearch}
        >
          <span  style={{marginLeft:"-10px"}} role="img" aria-label="search">🔍</span>
        </button>

        {/* CHEKBOX DE ALL DRIVERS */}
        <label style = {{color:"white"}} className={styles.chekbox} title="If enabled it searches all pilots, and ignores currently applied filters.">
          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
            
          />
          All Drivers
        </label>

        <label className={styles.labelraya2}> | </label>
      </form>
    </div>
  );
}

export default SearchBar;



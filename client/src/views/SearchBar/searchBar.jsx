import styles from './searchbar.module.css';
import { useState } from 'react';

function SearchBar({ onSearch, isChecked, handleCheckboxChange }) { // Recibe el estado del checkbox y la función de cambio como props
  const [name, setName] = useState("");

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

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <div className={styles['search-container']}>
      <form className={styles['search-box']}>
        <input
          placeholder="Search"
          type='search'
          value={name}
          className={styles['input']}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />

        <button
          disabled={true}
          className={styles['buttonLink']}
          onClick={handleSearch}
        >
          <span role="img" aria-label="search">🔍</span>
        </button>

        <label className={styles.chekbox} title="If enabled it searches all pilots, and ignores currently applied filters.">
          <input
            checked={isChecked}
            onChange={handleCheckboxChange}
            type="checkbox"
          />
          All Drivers
        </label>

        <label className={styles.labelraya}> | </label>
      </form>
    </div>
  );
}

export default SearchBar;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDrivers,
  orderDrivers,
  getTeams,
  filterTeams,
  reset,
  filterOrigin,
  searchDrivers,
  setError
} from "../../redux/actions";

import Paginado from "../Paginado/Paginado";
import CardList from "../../components/CardList/cardList";
import Navbar from "../../components/Nav/nav";
import styles from "./home.module.css";

function Home() {
  const dispatch = useDispatch();
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const teams = useSelector((state) => state.teams);
  const error = useSelector((state) => state.error);

  const [currentPage, setCurrentPage] = useState(
    parseInt(localStorage.getItem("currentPage")) || 1
  );
  const driversPerPage = 9;
  const indexLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexLastDriver - driversPerPage;

  const [selectedOrder, setSelectedOrder] = useState(
    localStorage.getItem("selectedOrder") || ""
  );
  const [selectedTeam, setSelectedTeam] = useState(
    localStorage.getItem("selectedTeam") || ""
  );
  const [selectedOrigin, setSelectedOrigin] = useState(
    localStorage.getItem("selectedOrigin") || ""
  );
  const [checkedSearch, setCheckedSearch] = useState(
    localStorage.getItem("checkedSearch") === "true"
  );

  /* MENSAJE DE ERROR */
  useEffect(() => {
    setTimeout(() => {
      dispatch(setError(""));
    }, 8000);
  }, [dispatch, error])
  
  /* CARGO FILTEREDDRIVERS */
  useEffect(() => {
    if (!filteredDrivers.length) {
      dispatch(getDrivers());
    }
  }, [dispatch, filteredDrivers]);

  /* ME TRAIGO LOS TEAMS */
  useEffect(() => {
    if (!teams.length) {
      dispatch(getTeams());
    }
  }, [dispatch, teams]);

  /* PAGINADO */
  useEffect(() => {
    const storedCurrentPage = localStorage.getItem("currentPage");
    if (storedCurrentPage) {
      setCurrentPage(parseInt(storedCurrentPage));
      localStorage.removeItem("currentPage");
    }
  }, []);

  /* PAGINA ACTUAL */  
  useEffect(() => {
    localStorage.setItem("currentPage", currentPage.toString());
  }, [currentPage]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /* HANDLER ORDENAMIENTO ASC/DESC/DOB */
  const handleOrder = (event) => {
    const orderType = event.target.value;
    setSelectedOrder(orderType);
    localStorage.setItem("selectedOrder", orderType);
    dispatch(orderDrivers(orderType));
  };

  /* HANDLER FILTRO X TEAMS*/
  const handlerFilterTeam = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", team);
    dispatch(filterTeams(team));
    setCurrentPage(1);
  };

  /* HANDLER DE BUSQUEDA */
  const handleSearch = (name, isChecked) => {
      setCheckedSearch(isChecked);
      localStorage.setItem("checkedSearch", isChecked.toString());
      dispatch(searchDrivers(name, isChecked));
      setCurrentPage(1);
  };

  /* HANDLER PARA RESETEAR LOS FILTROS */
  const resetHandler = () => {
    setCurrentPage(1);
    setSelectedOrder("");
    setSelectedTeam("");
    setSelectedOrigin("");
    setCheckedSearch(false);
    localStorage.removeItem("selectedOrder");
    localStorage.removeItem("selectedTeam");
    localStorage.removeItem("selectedOrigin");
    localStorage.removeItem("checkedSearch");
    dispatch(reset());
  };

  /* HANDLER PARA FILTROS POR ORIGEN ALL/API/DB */
  const handlerFilterOrigin = (event) => {
    const origin = event.target.value;
    setSelectedOrigin(origin);
    localStorage.setItem("selectedOrigin", origin);
    dispatch(filterOrigin(origin));
  };

  return (
    <div className={styles.home}>

      {/* REDETIZADO NAVBAR */}
      <div className={styles.navBar}>
        <Navbar
          onSearch={handleSearch}
          handleOrder={handleOrder}
          teams={teams}
          handlerFilterTeam={handlerFilterTeam}
          resetHandler={resetHandler}
          handlerFilterOrigin={handlerFilterOrigin}
          selectedOrder={selectedOrder}
          selectedTeam={selectedTeam}
          selectedOrigin={selectedOrigin}
          checkedSearch={checkedSearch}
        />
        {error && <p className={styles.errores}>{error}</p>}
      </div>

      {/* REDETIZADO PAGINADO */}
      <div className={styles.paginadoContainer}>
        <Paginado
          driversPerPage={driversPerPage}
          allDrivers={filteredDrivers.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      
      {/* REDETIZADO DE LAS CARTAS => DRIVERS */}
      <CardList drivers={filteredDrivers.slice(indexOfFirstDriver, indexLastDriver)} />
    </div>
  );
}

export default Home;

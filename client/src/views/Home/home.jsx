import styles from "./home.module.css";
import CardList from "../../components/CardList/cardList";
import Navbar from "../../components/Nav/nav";
import { getDrivers, orderDrivers, getTeams, filterTeams, reset, filterOrigin, searchDrivers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Paginado from '../Paginado/Paginado'

function Home() {
  const dispatch = useDispatch();
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const teams = useSelector((state) => state.teams);

  const [currentPage, setCurrentPage] = useState(1); // (PAGINADO) estado currentPage para la página actual  
  const driversPerPage = 8; // (PAGINADO) conductores por página
  const indexLastDirver = currentPage * driversPerPage; // (PAGINADO) índice último driver, para saber el rango de drivers que se muestran en cada página.
  const indexOfFirstDirver = indexLastDirver - driversPerPage; // (PAGINADO) índice primer driver, para saber el rango de drivers que se muestran en cada página.

  const [selectedOrder, setSelectedOrder] = useState(localStorage.getItem("selectedOrder") || "");
  const [selectedTeam, setSelectedTeam] = useState(localStorage.getItem("selectedTeam") || "");
  const [selectedOrigin, setSelectedOrigin] = useState(localStorage.getItem("selectedOrigin") || "");
  const [checkedSearch, setCheckedSearch] = useState(localStorage.getItem("checkedSearch") === "true");

  useEffect(() => {
    if (!filteredDrivers.length) {
      dispatch(getDrivers());
    }
  }, [dispatch, filteredDrivers]);

  useEffect(() => {
    if (!teams.length) {
      dispatch(getTeams());
    }
  }, [dispatch, teams]);

  useEffect(() => {
    const storedCurrentPage = localStorage.getItem('currentPage');
    if (storedCurrentPage) {
      setCurrentPage(parseInt(storedCurrentPage));
      localStorage.removeItem('currentPage'); 
    }
  }, []);
  
  /*************************************/
  /*****   ESTABLEZCO NRO PAGINA   *****/
  /*************************************/
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  /**** ORDENAMIENTO (actions/redux) ***/
  useEffect(() => {
    localStorage.setItem("selectedOrder", selectedOrder);
  }, [selectedOrder]);

  const handleOrder = (event) => {
    const orderType = event.target.value;
    setSelectedOrder(orderType);
    localStorage.setItem("selectedOrder", orderType);
    dispatch(orderDrivers(orderType));
  };

  /** FILTRO x teams (actions/redux)  **/
  useEffect(() => {
    localStorage.setItem("selectedTeam", selectedTeam);
  }, [selectedTeam]);

  const handlerFilterTeam = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);
    localStorage.setItem("selectedTeam", team);
    dispatch(filterTeams(team));
  };

  /*************************************/
  /*****     BUSCO POR NOMBRE      *****/
  /*************************************/
  useEffect(() => {
    localStorage.setItem("checkedSearch", checkedSearch.toString());
  }, [checkedSearch]);

  const handleSearch = (name, isChecked) => {
    dispatch(searchDrivers(name, isChecked));
  };

  const resetHandler = () => {
    setSelectedOrder("");
    setSelectedTeam("");
    setSelectedOrigin("");
    setCheckedSearch(false);
    dispatch(reset());
  };

  useEffect(() => {
    localStorage.setItem("selectedOrigin", selectedOrigin);
  }, [selectedOrigin]);

  const handlerFilterOrigin = (event) => {
    const origin = event.target.value;
    setSelectedOrigin(origin);
    localStorage.setItem("selectedOrigin", origin);
    dispatch(filterOrigin(origin));
  };

  return (
    <div className={styles.home}>
      <Navbar
        onSearch={handleSearch}
        selectedOrder={selectedOrder}
        selectedTeam={selectedTeam}
        selectedOrigin={selectedOrigin}
        checkedSearch={checkedSearch}
        handleOrder={handleOrder}
        teams={teams}
        handlerFilterTeam={handlerFilterTeam}
        resetHandler={resetHandler}
        handlerFilterOrigin={handlerFilterOrigin}
      />
      {/***************************************/}
      {/* RENDERIZO EL PAGINADO (propiedades) */}
      {/***************************************/}
      <div className={styles.paginadoContainer}>
        <Paginado
          driversPerPage={driversPerPage}
          allDrivers={filteredDrivers.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      <CardList drivers={filteredDrivers.slice(indexOfFirstDirver, indexLastDirver)} />
    </div>
  );
}

export default Home;


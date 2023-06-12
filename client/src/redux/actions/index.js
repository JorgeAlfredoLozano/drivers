import axios from "axios";

export const GET_DRIVERS = "GET_DRIVERS";
export const ORDER = "ORDER";
export const GET_TEAMS = "FILTER_TEAM";
export const FILTER_TEAMS = "FILTER_TEAMS";
export const RESET = "RESET";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const SEARCH_DRIVERS = "SEARCH_DRIVERS"

export function getDrivers() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/drivers");
      return dispatch({
        type: "GET_DRIVERS",
        payload: response.data,
      });
    } catch (error) {}
  };
}

export function orderDrivers(orderType) {

  return {
    type: ORDER,
    payload: orderType
  }
}

export function getTeams() {
  return async function (dispatch) {
    try {
      const response = await axios("http://localhost:3001/teams");
      return dispatch({
        type: GET_TEAMS,
        payload: response.data,
      });
    } catch (error) {
      // Manejo de errores
    }
  };
}

export function filterTeams(team) {
  
  return { 
    type: FILTER_TEAMS,
    payload: team
  }
}

export function reset() {
  return {
    type: RESET,
   
  }
}

export function filterOrigin(origin) {
  
  return { 
    type: FILTER_ORIGIN,
    payload: origin
  }
}

export function searchDrivers(name,isChecked) {
  
  return {
    type: SEARCH_DRIVERS,
    payload: {name,isChecked}
  }
}
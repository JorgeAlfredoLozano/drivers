import { all } from "axios";
import Cards from "../Cards/cards";
import "./cardList.styles.css";

function CardList({drivers}) {
  const arrDrivers = drivers

  return (
    <div className="card-list">
      {arrDrivers?.map((driver, index) => (<Cards key={index} driver={driver} />))}
    </div>
  );
}

export default CardList;

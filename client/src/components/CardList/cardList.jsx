import { all } from "axios";
import Cards from "../Cards/cards";
import styles from "./cardList.module.css";

function CardList({drivers}) {
  const arrDrivers = drivers

  return (
    <div className={styles.card_list}>
      {arrDrivers?.map((driver, index) => (<Cards key={index} driver={driver} />))}
    </div>
  );
}

export default CardList;

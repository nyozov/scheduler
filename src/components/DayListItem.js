import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";


export default function DayListItem(props) {
  const itemClass = classNames("day-list__item" , {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  })

  const formatSpots = (props)=>{
    if (props.spots === 0){
      return "no spots remaining"
    } else if (props.spots === 1){
      return "1 spot remaining"
    } else {
      return `${props.spots} spots remaining`
    }

    
  }
  return (
    <li 
    className = {itemClass}
    onClick={()=> props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}
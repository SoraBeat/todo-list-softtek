import React,{useState} from "react";

const Card = ({
  data: {id, title, dateTime, creator, description, status, priority },deleteCard,editCardStatus,data
}) => {
  const [showMore,setShowMore]=useState(false)
  const newDate = new Date(dateTime).toLocaleString() + " hs.";

  const limitString = (str) => {
    if (str.length > 150)
      return { string: str.slice(0, 149).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };
  return (
    <div className="card">
      <div className="close" onClick={()=>deleteCard(id)}>x</div>
      <h3>{title}</h3>
      <h6>{newDate}</h6>
      <h5>{creator}</h5>
      <button type="button" className={status} onClick={()=>editCardStatus(data)}>
        {status}
      </button>
      <button type="button" className={priority}>
        {priority}
      </button>
      <p>{!showMore&&limitString(description).string}</p>
      {showMore&&<p>{description}</p>}
      {limitString(description).addButton && (
        <button type="button" onClick={()=>{setShowMore(!showMore)}}>{showMore?"Ocultar":"Ver mas"}</button>
      )}
    </div>
  );
};

export default Card;

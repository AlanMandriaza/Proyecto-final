import React from "react";
import PropTypes from "prop-types";

const CardsFront = (props) => {
  return (
    <>
      <img src={props.imagen} className={props.stilos} alt="..."></img>
      <h4 className="text-center mb-5">{props.texto}</h4>
    </>
  );
};

CardsFront.propTypes = {
  imagen: PropTypes.string,
  texto: PropTypes.string,
  stilos:PropTypes.string,
};

export default CardsFront;

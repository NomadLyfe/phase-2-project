import React, { useEffect,  useState } from 'react';
import '../css files/App.css';

function CardDisplay({ searchedCard }) {
  return (
    <div className='cardwrapper'>
			{!searchedCard ? null : <img src={searchedCard.image_uris.normal} className="Card-logo" alt={searchedCard.name} />}
    </div>
  );
}

export default CardDisplay;

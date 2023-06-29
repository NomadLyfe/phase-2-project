import React from 'react';
import '../css files/App.css';

function CardDisplay({ selectedCard, commander }) {
  return (
    <div className='cardwrapper'>
			<div className="Card-logo" >
				{!selectedCard ? null : <img src={selectedCard.image_uris.normal}  className="Card" alt={selectedCard.name} />}
				<p>
					{selectedCard && selectedCard.prices.usd ? `Price – $${selectedCard.prices.usd}` : null}
					{selectedCard && !selectedCard.prices.usd ? `Price – No Data` : null}
					{selectedCard && selectedCard.prices.usd_foil ? ` / $${selectedCard.prices.usd_foil}` : null}
					{selectedCard && selectedCard.prices.usd_foil ? <span className='foil-box'></span> : null}
				</p>
				<p>{selectedCard ? `Set – ${selectedCard.set_name}` : null}</p>
			</div>
			
    </div>
  );
}

export default CardDisplay;

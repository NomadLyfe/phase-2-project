import React, { useEffect,  useState } from 'react';
import '../css files/App.css';

function DeckDisplay({ searchedCard, setSearchedCard }) {
  return (
    <div className='deckwrapper'>
			<h3>
				Commander ({searchedCard ? searchedCard.length : null})
			</h3>
			<h3>
				Planeswalkers ({})
			</h3>
			<h3>
				Creatures ({})
			</h3>
			<h3>
				Sorceries ({})
			</h3>
			<h3>
				Instants ({})
			</h3>
			<h3>
				Artifacts ({})
			</h3>
			<h3>
				Enchantments ({})
			</h3>
			<h3>
				Lands ({})
			</h3>
    </div>
  );
}

export default DeckDisplay;

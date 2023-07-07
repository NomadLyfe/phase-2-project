import React, { useEffect, useState } from 'react';
import Header from './Header.js'
import '../css files/App.css';
import CardDisplay from './CardDisplay.js';
import DeckDisplay from './DeckDisplay.js';
import { useParams } from "react-router-dom";

function DeckEditor ({ searchedCard, setSearchedCard, onSearch, cardList, selectedCard, setCardList, handleMouseOver, commander, setCommander, setSelectedCard, user, decks, handleFilterChange, filter, deleteDeckCard }) {
	const params = useParams();
	const [owner, setOwner] = useState('');
	useEffect(() => {
		fetch(`https://lotus-forge-db.onrender.com/decks/${params.id}`)
		.then(r => r.json())
		.then(deck => {
			fetch(`https://api.scryfall.com/cards/search?q=${deck.commander}&unique=cards`)
    	.then(res => res.json())
    	.then(card => {
      	const correctCard = card.data.filter(el => el.name === deck.commander);
      	setCommander(correctCard[0]);
      	setSelectedCard(correctCard[0]);
				setCardList(deck.cards);
    	});
		})
}, [params.id])
  return (
		<div className='main'>
			<Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} user={user} decks={decks} handleFilterChange={handleFilterChange} filter={filter} owner={owner} setOwner={setOwner} />
			<main>
				<CardDisplay selectedCard={selectedCard} commander={commander} />
				<DeckDisplay searchedCard={searchedCard} cardList={cardList} setCardList={setCardList} handleMouseOver={handleMouseOver} commander={commander} owner={owner} user={user} deleteDeckCard={deleteDeckCard} />
			</main>
		</div>
  )
}

export default DeckEditor;
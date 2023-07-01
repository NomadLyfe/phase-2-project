import React, { useEffect } from 'react';
import Header from './Header.js'
import '../css files/App.css';
import CardDisplay from './CardDisplay.js';
import DeckDisplay from './DeckDisplay.js';
import { useParams } from "react-router-dom";

function DeckEditor ({ searchedCard, setSearchedCard, onSearch, cardList, selectedCard, setCardList, handleMouseOver, commander, setCommander, setSelectedCard, user }) {
	const { id } = useParams();
	useEffect(() => {
		fetch(`http://localhost:3001/decks/${id}`)
		.then(r => r.json())
		.then(deck => {
			fetch(`https://api.scryfall.com/cards/search?q=${deck.commander}&unique=cards`)
    	.then(res => res.json())
    	.then(card => {
      	const correctCard = card.data.filter(el => el.name === deck.commander);
      	setCommander(correctCard[0]);
      	setSelectedCard(correctCard[0]);
    	});
		})
}, [id])
  return (
		<div className='main'>
			<Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} user={user} />
			<main>
				<CardDisplay selectedCard={selectedCard} commander={commander} />
				<DeckDisplay searchedCard={searchedCard} setSearchedCard={setSearchedCard} cardList={cardList} setCardList={setCardList} handleMouseOver={handleMouseOver} commander={commander} />
			</main>
		</div>
  )
}

export default DeckEditor;
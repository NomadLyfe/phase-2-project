import React, { useState } from 'react';
import Header from './Header.js'
import '../css files/App.css';
import CardDisplay from './CardDisplay';
import DeckDisplay from './DeckDisplay';
import { Switch, Route } from "react-router-dom";

function DeckEditer ({ searchedCard, setSearchedCard, onSearch, cardList, selectedCard, setCardList, handleMouseOver, commander }) {
  return (
		<div>
			<Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} />
			<main>
				<CardDisplay selectedCard={selectedCard} commander={commander} />
				<DeckDisplay searchedCard={searchedCard} setSearchedCard={setSearchedCard} cardList={cardList} setCardList={setCardList} handleMouseOver={handleMouseOver} commander={commander} />
			</main>
		</div>
  )
}

export default DeckEditer;
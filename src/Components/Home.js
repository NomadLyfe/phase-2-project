import React from "react";
import Header from "./Header";
import AllDecks from "./AllDecks";

function Home ({ setSearchedCard, onSearch, cardList, user, decks }) {
	return (
	<div>
    <Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} user={user} />
    <AllDecks decks={decks} />
  </div>
	);
}

export default Home;
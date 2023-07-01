import React from "react";
import Header from "./Header";
import AllDecks from "./AllDecks";

function Home ({ setSearchedCard, onSearch, cardList, user }) {
	return (
	<div>
    <Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} user={user} />
    <AllDecks />
  </div>
	);
}

export default Home;
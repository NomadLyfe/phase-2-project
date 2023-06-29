import React, { useEffect,  useState } from 'react';
import Header from './Header.js'
import '../css files/App.css';
import CardDisplay from './CardDisplay';
import DeckDisplay from './DeckDisplay';

function App() {
  const [searchedCard, setSearchedCard] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  function onSearch(card) {
    setSelectedCard(card)
  }
  function handleMouseOver(e) {
    fetch(`http://localhost:3000/cards/${e.target.alt}`)
    .then(res => res.json())
    .then(card => {
      setSelectedCard(card);
		});
  }
  return (
    <div className="App">
      <Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} />
      <main>
        <CardDisplay selectedCard={selectedCard} />
        <DeckDisplay searchedCard={searchedCard} setSearchedCard={setSearchedCard} cardList={cardList} setCardList={setCardList} handleMouseOver={handleMouseOver} />
      </main>
    </div>
  );
}

export default App;

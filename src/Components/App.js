import React, { useEffect,  useState } from 'react';
import Header from './Header.js'
import '../css files/App.css';
import CardDisplay from './CardDisplay';
import DeckDisplay from './DeckDisplay';

function App() {
  const [searchedCard, setSearchedCard] = useState(null);
  const [data, setData] = useState({Commander: null, Planeswalker: null, Creatures: null, Sorceries: null, Instants: null, Artifacts: null, Enchantments: null, Lands: null})
  return (
    <div className="App">
      <Header setSearchedCard={setSearchedCard} />
      <main>
        <CardDisplay searchedCard={searchedCard} />
        <DeckDisplay searchedCard={searchedCard} setSearchedCard={setSearchedCard} />
      </main>
    </div>
  );
}

export default App;

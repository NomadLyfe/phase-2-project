import React, { useState } from 'react';
import Header from './Header.js'
import '../css files/App.css';
import CardDisplay from './CardDisplay';
import DeckDisplay from './DeckDisplay';
import Login from './Login.js';
import Newdeck from './Newdeck.js';

function App() {
  const [searchedCard, setSearchedCard] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [logindata, setLogindata] = useState({ username: '', password: '' });
  const [logedin, setLogedin] = useState(false);
  const [commander, setCommander] = useState(null);
  function onSearch(card) {
    setSelectedCard(card)
  }
  function handleMouseOver(e) {
    fetch(`http://localhost:3000/cards/${e.target.alt}`)
    .then(res => res.json())
    .then(card => setSelectedCard(card));
  }
  function handleLogin (e) {
    e.preventDefault();
    fetch(`http://localhost:4000/logins/${logindata.username}`)
    .then(res => res.json())
    .then(loginInfo => {
      if (loginInfo.password === logindata.password) {
        setLogedin(true);
      } else {
        setLogindata({ username: '', password: '' });
        alert('\nIncorrect username or password!');
      }
    })
  }
  function trackLogin (e) {
    setLogindata({...logindata, [e.target.previousSibling.id]: e.target.value});
  }
  function handleCommanderSelection(e, input) {
    e.preventDefault();
    fetch(`http://localhost:3000/cards/${input}`)
    .then(res => res.json())
    .then(comm => setCommander(comm));
  }
  if (!logedin) return <Login handleSubmit={handleLogin} handleChange={trackLogin} logindata={logindata} />
  if (!commander) return <Newdeck handleSubmit={handleCommanderSelection} />
  return (
    <div className="App">
      <Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} />
      <main>
        <CardDisplay selectedCard={selectedCard} commander={commander} />
        <DeckDisplay searchedCard={searchedCard} setSearchedCard={setSearchedCard} cardList={cardList} setCardList={setCardList} handleMouseOver={handleMouseOver} commander={commander} />
      </main>
    </div>
  );
}

export default App;

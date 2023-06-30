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
  const [logindata, setLogindata] = useState({ name: '', password: '' });
  const [commander, setCommander] = useState(null);
  const [user, setUser] = useState(null);
  function onSearch(card) {
    setSelectedCard(card)
  }
  function handleMouseOver(e) {
    fetch(`https://api.scryfall.com/cards/search?q=${e.target.alt}&unique=cards`)
    .then(res => res.json())
    .then(card => {
      const correctCard = card.data.filter(el => el.name === e.target.alt);
      setSelectedCard(correctCard[0]);
    });
  }
  function handleLogin (e) {
    e.preventDefault();
    fetch(`http://localhost:3001/users/${logindata.name}`)
    .then(res => res.json())
    .then(loginInfo => {
      if (loginInfo.password === logindata.password) {
        setUser(loginInfo.name);
        setLogindata({ name: '', password: '' });
      } else {
        setLogindata({ name: '', password: '' });
        alert('\nIncorrect username or password!');
      }
    })
  }
  function trackLogin (e) {
    setLogindata({...logindata, [e.target.previousSibling.id]: e.target.value});
  }
  function handleNewDeck (e, formData) {
    e.preventDefault();
    fetch(`https://api.scryfall.com/cards/search?q=${formData.commander}&unique=cards`)
    .then(res => res.json())
    .then(card => {
      const correctCard = card.data.filter(el => el.name === formData.commander);
      setCommander(correctCard[0]);
      setSelectedCard(correctCard[0]);
    });
    console.log(formData)
    fetch("http://localhost:3001/decks/", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => console.log(data));
  }
  function handleLogout () {
    setCommander(null);
    setSelectedCard(null);
    setUser(null);
    setSearchedCard(null);
  }
  if (!user) return <Login handleSubmit={handleLogin} handleChange={trackLogin} logindata={logindata} />
  if (!commander) return <Newdeck handleSubmit={handleNewDeck} handleLogout={handleLogout} user={user} />
  return (
    <div className="App">
      <button className='logout' onClick={handleLogout}>Log Out</button>
      <Header setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} />
      <main>
        <CardDisplay selectedCard={selectedCard} commander={commander} />
        <DeckDisplay searchedCard={searchedCard} setSearchedCard={setSearchedCard} cardList={cardList} setCardList={setCardList} handleMouseOver={handleMouseOver} commander={commander} />
      </main>
    </div>
  );
}

export default App;

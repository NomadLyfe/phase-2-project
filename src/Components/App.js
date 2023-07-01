import React, { useState } from 'react';
import '../css files/App.css';
import Login from './Login.js';
import MyDecks from './MyDecks.js';
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import DeckEditor from './DeckEditor.js';
import Home from './Home';
import Register from './Register';

function App() {
  const [searchedCard, setSearchedCard] = useState(null);
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [logindata, setLogindata] = useState({name: '', password: ''});
  const [commander, setCommander] = useState(null);
  const [user, setUser] = useState(null);
  const [deckList, setDeckList] = useState([]);

  function onSearch(card, deckName) {
    setSelectedCard(card);
    const removedNullElementCardList = cardList.filter(card => !!card)
    fetch(`http://localhost:3001/decks/${deckName.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({cards: [...removedNullElementCardList, card]})
    })
    .then(res => res.json())
    .then(data => {console.log(data)});
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
    .catch(() => alert('\nIncorrect username or password!'));
    fetch(`http://localhost:3001/decks`)
    .then(res => res.json())
    .then(decks => {
      const decksOwnedByCurrentUser = decks.filter(deck => deck.owner === logindata.name);
      setDeckList(decksOwnedByCurrentUser);
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
      const correctCard = card.data.filter(el => el.name.toLowerCase() === formData.commander.toLowerCase());
      if (correctCard[0].type_line.contains('Legendary Creature')) {
        setCommander(correctCard[0]);
        setSelectedCard(correctCard[0]);
        setDeckList([...deckList, formData]);
        fetch("http://localhost:3001/decks/", {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => console.log(data));
      } else {
        alert("\nThat isn't a legal Commander!")
      }
    })
    .catch(() => {
      alert("\nThat isn't a legal Commander!")
    })
  }

  function handleLogout () {
    setCommander(null);
    setSelectedCard(null);
    setUser(null);
    setSearchedCard(null);
  }

  return (
    <div className="App">
      <NavBar user={user} commander={commander} handleLogout={handleLogout} setSelectedCard={setSelectedCard} setSearchedCard={setSearchedCard} setCommander={setCommander} setCardList={setCardList} />
      <Switch>
        <Route exact path="/home">
          <Home setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} user={user} />
        </Route>
        <Route exact path="/login">
          <Login handleSubmit={handleLogin} handleChange={trackLogin} logindata={logindata} user={user} />
        </Route>
        <Route exact path="/mydecks/:id">
          <DeckEditor setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} selectedCard={selectedCard} commander={commander} searchedCard={searchedCard} setCardList={setCardList} handleMouseOver={handleMouseOver} setSelectedCard={setSelectedCard} setCommander={setCommander} user={user} />
        </Route>
        <Route exact path="/mydecks">
          <MyDecks handleSubmit={handleNewDeck} user={user} deckList={deckList} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          
        </Route>
      </Switch>
    </div>
  );
}

export default App;

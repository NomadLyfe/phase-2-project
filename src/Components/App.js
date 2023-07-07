import React, { useState, useEffect } from 'react';
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
  const [logindata, setLogindata] = useState({id: '', password: ''});
  const [commander, setCommander] = useState(null);
  const [user, setUser] = useState(null);
  const [deckList, setDeckList] = useState([]);
  const [decks, setDecks] = useState(null);
	const [filter, setFilter] = useState('');
	
  useEffect(() => {
		fetch("https://lotus-forge-db.onrender.com/decks")
		.then(res => res.json())
		.then(decks => setDecks(decks))
	}, []);

  function onSearch(card, deckName) {
    setSelectedCard(card);
    const removedNullElementCardList = cardList.filter(card => !!card)
    fetch(`https://lotus-forge-db.onrender.com/decks/${deckName.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({cards: [...removedNullElementCardList, card]})
    })
    .then(res => res.json());
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
    fetch(`https://lotus-forge-db.onrender.com/users/${logindata.id}`)
    .then(res => res.json())
    .then(loginInfo => {
      if (loginInfo.password === logindata.password) {
        setUser(loginInfo.id);
        setLogindata({ id: '', password: '' });
      } else {
        setLogindata({ id: '', password: '' });
        alert('\nIncorrect username or password!');
      }
    })
    .catch(() => alert('\nIncorrect username or password!'));
    fetch(`https://lotus-forge-db.onrender.com/decks`)
    .then(res => res.json())
    .then(decks => {
      const decksOwnedByCurrentUser = decks.filter(deck => deck.owner === logindata.id);
      setDeckList(decksOwnedByCurrentUser);
    })
  }

  function trackLogin (e) {
    setLogindata({...logindata, [e.target.previousSibling.id]: e.target.value});
  }
  function handleNewDeck (e, formData, setFormData, setClicked, clicked) {
    e.preventDefault();
    fetch(`https://api.scryfall.com/cards/search?q=${formData.commander}&unique=cards`)
    .then(res => res.json())
    .then(card => {
      const correctCard = card.data.filter(el => el.name.toLowerCase() === formData.commander.toLowerCase());
      const checkForRepeatDeckName = decks.find(deck => formData.id === deck.id);
      if (!checkForRepeatDeckName) {
        if (correctCard[0].type_line.includes('Legendary') && correctCard[0].type_line.includes('Creature')) {
          setCommander(correctCard[0]);
          setSelectedCard(correctCard[0]);
          setDeckList([...deckList, formData]);
          setDecks([...decks, formData]);
          fetch("https://lotus-forge-db.onrender.com/decks/", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({...formData, commander: correctCard[0].name})
          })
          .then(res => res.json());
          setFormData({owner: user, id: '', commander: '', cards: []});
          setClicked(!clicked);
        } else {
          alert("\nThat isn't a legal Commander!")
        }
      } else {
        alert("That deck name is already in use!")
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

	function handleFilterChange(e) {
		setFilter(() => {
      console.log(e.target.value);
      return e.target.value;
    });
	}

  function deleteDeckCard (e, card, params) {
    const cardToBeRemovedIndex = cardList.findIndex(cardEl => cardEl === card);
    if (cardToBeRemovedIndex >= 0) {
      cardList.splice(cardToBeRemovedIndex, 1);
    }
    fetch(`https://lotus-forge-db.onrender.com/decks/${params.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({"cards": [...cardList]})
    })
    .then(res => res.json())
    .then(data => {
      setCardList(data.cards);
    });
  }

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} setSelectedCard={setSelectedCard} setSearchedCard={setSearchedCard} setCommander={setCommander} setCardList={setCardList} />
      <Switch>
        <Route exact path="/home">
          <Home setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} user={user} decks={decks} />
        </Route>
        <Route exact path="/login">
          <Login handleSubmit={handleLogin} handleChange={trackLogin} logindata={logindata} user={user} />
        </Route>
        <Route exact path="/decks/:id">
          <DeckEditor setSearchedCard={setSearchedCard} onSearch={onSearch} cardList={cardList} selectedCard={selectedCard} commander={commander} searchedCard={searchedCard} setCardList={setCardList} handleMouseOver={handleMouseOver} setSelectedCard={setSelectedCard} setCommander={setCommander} user={user} decks={decks} handleFilterChange={handleFilterChange} filter={filter} deleteDeckCard={deleteDeckCard} />
        </Route>
        <Route exact path="/decks">
          <MyDecks handleSubmit={handleNewDeck} user={user} deckList={deckList} setDeckList={setDeckList} decks={decks} setDecks={setDecks} />
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

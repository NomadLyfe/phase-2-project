import React, { useState } from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function MyDecks({ handleSubmit, handleLogout, user, deckList, handleSelectDeck }) {
	const [formData, setFormData] = useState({owner: user, name: '', commander: ''});
	const [clicked, setClicked] = useState(false);
	function handleChange(e) {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	function handleClick() {
		setClicked(true);
	}
	const renderedDeckList = deckList.map(deck => {
		return (
			<button key={deck.name} className='decks' name={deck.name} onClick={(e) => handleSelectDeck(e, deck)}>{deck.name}</button>
		)
	})
  return (
		<div className='deckPage'>
			<button className='logout' onClick={handleLogout}>Log Out</button>
			<img src={logo} className='newdecklogo' />
			<div className='newdeck'>
				{clicked ? null : <button className='newdeckbutton' onClick={handleClick}>Make a new deck <br /> <span>+</span> </button>}
				{clicked ? <form onSubmit={(e) => handleSubmit(e, formData)}>
					<label>Make a Deck Name:</label><br /><input name='name' type='text' onChange={handleChange} value={formData.name} /><br />
					<label>Choose a Commander:</label><br /><input name='commander' type='text' onChange={handleChange} value={formData.commander} /><br />
					<button>Submit</button>
				</form> : null}
			</div>
			<h1>Archived Decks:</h1>
			<div className='decks'>
				{deckList.length !== 0 ? {renderedDeckList} : "You haven't made any yet!"}
			</div>
		</div>
    
  );
}

export default MyDecks;

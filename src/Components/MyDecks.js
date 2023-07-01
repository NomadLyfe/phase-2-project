import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function MyDecks({ handleSubmit, user, deckList }) {
	const [formData, setFormData] = useState({owner: user, name: '', commander: ''});
	const [clicked, setClicked] = useState(false);
	function handleChange(e) {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	function handleClick() {
		setClicked(true);
	}
	const renderedDeckList = deckList.map(deck => {
		const link = `/mydecks/${deck.name}`;
		return (
			<Link exact to={link} key={deck.name} className='deck'>{deck.name}</Link>
		)
	})
  return (
		<div className='deckPage'>
			<img src={logo} className='newdecklogo' />
			<div className='newdeck'>
				<h1>Make a new deck:</h1>
				{clicked ? null : <button className='newdeckbutton' onClick={handleClick}><span>+</span></button>}
				{clicked ? <form onSubmit={(e) => handleSubmit(e, formData)}>
					<label>Make a Deck Name:</label><br /><input name='name' type='text' onChange={handleChange} value={formData.name} /><br />
					<label>Choose a Commander:</label><br /><input name='commander' type='text' onChange={handleChange} value={formData.commander} /><br />
					<button>Submit</button>
				</form> : null}
			</div>
			<h1>Archived Decks:</h1>
			<div className='decks'>{renderedDeckList}</div>
		</div>
    
  );
}

export default MyDecks;

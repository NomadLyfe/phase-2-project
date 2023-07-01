import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function MyDecks({ handleSubmit, user, deckList }) {
	const [formData, setFormData] = useState({owner: user, name: '', commander: '', cards: []});
	const [clicked, setClicked] = useState(false);
	function handleChange(e) {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	function handleClick() {
		setClicked(!clicked);
	}
	const renderedDeckList = deckList.map(deck => {
		const link = `/mydecks/${deck.name}`;
		return (
			<div className='delAndLink'>
				<button className='deletebtn'>Delete</button>
				<Link exact to={link} key={deck.name} className='deck'><span>{deck.name}</span></Link>
			</div>
		)
	})
  return (
		<div className='deckPage'>
			<img src={logo} className='newdecklogo' />
			<div className='newdeck'>
				<h1>Make a new deck:</h1><br />
				{clicked ? null : <button className='newdeckbutton' onClick={handleClick}><span>+</span></button>}
				{clicked ? <form onSubmit={(e) => handleSubmit(e, formData)}>
					<label>Deck Name:</label><br /><input name='name' type='text' onChange={handleChange} value={formData.name} /><br />
					<label>Commander:</label><br /><input name='commander' type='text' onChange={handleChange} value={formData.commander} /><br />
					<button>Submit</button><button onClick={handleClick}>Cancel</button> <br />
				</form> : null}
			</div>
			<h1>Archived Decks:</h1>
			<div className='decks'>{renderedDeckList}</div>
		</div>
    
  );
}

export default MyDecks;

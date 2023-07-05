import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function MyDecks({ handleSubmit, user, deckList, setDeckList, decks, setDecks }) {
	const [formData, setFormData] = useState({owner: user, name: '', commander: '', cards: []});
	const [clicked, setClicked] = useState(false);
	function handleDeleteDeck(e) {
		fetch(`http://localhost:3001/decks/${e.target.name}`, {
			method: "DELETE",
			headers: {
				'Content-type': 'application/json'
			}
		})
		.then(res => res.json())
		.then(() => {
			const newDeckList = deckList.filter(deck => deck.name !== e.target.name);
			const newDecks = decks.filter(deck => deck.name !== e.target.name);
			setDeckList([...newDeckList]);
			setDecks([...newDecks]);
		});
	}
	function handleChange(e) {
		setFormData({...formData, [e.target.name]: e.target.value});
	}
	function handleClick() {
		setClicked(!clicked);
	}
	const renderedDeckList = deckList.map(deck => {
		const link = `/decks/${deck.name}`;
		return (
			<div className='delAndLink' key={deck.name}>
				<button className='deletebtn' name={deck.name} onClick={handleDeleteDeck}>Delete</button>
				<Link to={link} className='deck'><span>{deck.name}</span></Link>
			</div>
		)
	})
  return (
		<div className='deckPage'>
			<img src={logo} className='newdecklogo' />
			<div className='newdeck'>
				<h1>Make a new deck:</h1><br />
				{clicked ? null : <button className='newdeckbutton' onClick={handleClick}><span>+</span></button>}
				{clicked ? <form onSubmit={(e) => handleSubmit(e, formData, setFormData, setClicked, clicked)}>
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

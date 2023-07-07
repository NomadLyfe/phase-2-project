import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function MyDecks({ handleSubmit, user, deckList, setDeckList, decks, setDecks }) {
	const [formData, setFormData] = useState({owner: user, id: '', commander: '', cards: []});
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
			const newDeckList = deckList.filter(deck => deck.id !== e.target.name);
			const newDecks = decks.filter(deck => deck.id !== e.target.name);
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
		const link = `/decks/${deck.id}`;
		return (
			<div className='delAndLink' key={deck.id}>
				<button className='deletebtn' name={deck.id} onClick={handleDeleteDeck}>Delete</button>
				<Link to={link} className='deck'><span>{deck.id}</span></Link>
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
					<label>Deck Name:</label><br /><input name='id' type='text' onChange={handleChange} value={formData.id} /><br />
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

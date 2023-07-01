import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Header({ setSearchedCard, onSearch, cardList, user }) {
	const [input, setInput] = useState('');
	const params = useParams();
	function handleChange(e) {
		setInput(e.target.value);
	}
  function handleSearch(e) {
		e.preventDefault()
		const lowerCaseInput = input.toLowerCase();
    fetch(`https://api.scryfall.com/cards/search?q=${lowerCaseInput}&unique=cards`)
    .then(res => res.json())
    .then(card => {
			const correctCard = card.data.filter(card => card.name.toLowerCase() === lowerCaseInput);
			const check = cardList.filter(el => !!el && el.name === correctCard[0].name);
			if (!check[0] || check[0].name === "Dragon's Approach" || check[0].name === 'Persistent Petitioners' || check[0].name === 'Rat Colony' || check[0].name === 'Relentless Rats' || check[0].name === 'Shadowborn Apostle' || check[0].type_line.includes('Basic Land')) {
        console.log(correctCard[0])
				setSearchedCard(correctCard[0]);
				onSearch(correctCard[0], params);
      } else {
				alert('\n You already added this card. \n \n Commander format allows for only one copy of each unique card. \n \n Please try another card.')
			}
			setInput('');
		})
		.catch(() => {
			alert('Not a valid Magic the Gathering card name.');
		})
	}
  return (
    <header className="App-header">
			<img src={logo} className="logo" alt="logo" />
			{user? <form onSubmit={handleSearch}>
					<input type='text' value={input} placeholder='Search cards to add...' onChange={handleChange} />
			</form> : <div className='empty'></div>}
    </header>
  );
}

export default Header;

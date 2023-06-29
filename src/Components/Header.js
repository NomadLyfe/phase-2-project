import React, { useState } from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Header({ setSearchedCard, onSearch, cardList }) {
	const [input, setInput] = useState('');
	function handleChange(e) {
		setInput(e.target.value);
	}
  function handleSearch(e) {
		e.preventDefault()
    fetch(`http://localhost:3000/cards/${input}`)
    .then(res => res.json())
    .then(card => {
			const check = cardList.filter(el => !!el && el.name === card.name);
			if (!check[0] || check[0].name === "Dragon's Approach" || check[0].name === 'Persistent Petitioners' || check[0].name === 'Rat Colony' || check[0].name === 'Relentless Rats' || check[0].name === 'Shadowborn Apostle' || check[0].type_line.includes('Basic Land')) {
        setSearchedCard(card);
				onSearch(card);
      } else {
				alert('\n You already added this card. \n \n Commander format allows for only one copy of each unique card. \n \n Please try another card.')
			}
			setInput('');
		});
	}
  return (
    <header className="App-header">
			<img src={logo} className="logo" alt="logo" />
			<form onSubmit={handleSearch}>
					<input type='text' value={input} placeholder='Search cards to add...' onChange={handleChange} />
			</form>
    </header>
  );
}

export default Header;

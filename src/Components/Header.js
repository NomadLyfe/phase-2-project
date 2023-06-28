import React, { useEffect,  useState } from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Header({ setSearchedCard }) {
	const [input, setInput] = useState('');
	function handleChange(e) {
		setInput(e.target.value);
	}
  function handleSearch(e) {
		e.preventDefault()
    fetch(`http://localhost:3000/cards/${input}`)
    .then(res => res.json())
    .then(card => {
			setSearchedCard(card);
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

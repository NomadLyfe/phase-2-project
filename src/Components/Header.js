import React, { useEffect,  useState } from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Header({ cards, setCards }) {
	const [input, setInput] = useState('');
	function handleChange(e) {
		setInput(e.target.value);
	}
  function handleSearch(e) {
		e.preventDefault()
    fetch('http://localhost:3000/cards/_____')
    .then(res => res.json())
    .then(cards => {
			setCards(cards)
			setInput('')
		});
	}
  return (
    <header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			{!cards ? null : <img src={cards.image_uris.png} className="App-logo" alt="logo" />}
			<form onSubmit={handleSearch}>
					<input type='text' value={input} onChange={handleChange} />
					<button>Add</button>
			</form>
			<p>
					Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
			>
					Learn React
			</a>
    </header>
  );
}

export default Header;

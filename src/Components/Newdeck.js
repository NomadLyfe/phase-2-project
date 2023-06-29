import React, { useState } from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Newdeck({ handleSubmit }) {
	const [input, setInput] = useState('');
	const [clicked, setClicked] = useState(false);
	function handleChange(e) {
		setInput(e.target.value)
	}
	function handleClick() {
		setClicked(true);
	}
  return (
		<div>
			<div className='newdeck'>
				<img src={logo} className='newdecklogo' />
				{clicked ? null : <button onClick={handleClick}>Make a new deck <br /> <span>+</span> </button>}
				{clicked ? <form onSubmit={(e) => handleSubmit(e, input)}><label>Choose a Commander:</label><br /><input type='text' onChange={handleChange} value={input} /></form> : null}
			</div>
			<div className='decks'>

			</div>
		</div>
    
  );
}

export default Newdeck;

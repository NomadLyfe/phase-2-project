import React, { useState } from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Newdeck({ handleSubmit, handleLogout, user }) {
	const [formData, setFormData] = useState({owner: user, name: '', commander: ''});
	const [clicked, setClicked] = useState(false);
	function handleChange(e) {
		setFormData({...formData, [e.target.name]: e.target.value})
	}
	function handleClick() {
		setClicked(true);
	}
  return (
		<div>
			<div className='newdeck'>
				<button className='logout' onClick={handleLogout}>Log Out</button>
				<img src={logo} className='newdecklogo' />
				{clicked ? null : <button className='newdeckbutton' onClick={handleClick}>Make a new deck <br /> <span>+</span> </button>}
				{clicked ? <form onSubmit={(e) => handleSubmit(e, formData)}>
					<label>Make a Deck Name:</label><br /><input name='name' type='text' onChange={handleChange} value={formData.name} /><br />
					<label>Choose a Commander:</label><br /><input name='commander' type='text' onChange={handleChange} value={formData.commander} /><br />
					<button>Submit</button>
				</form> : null}
			</div>
			<div className='decks'>

			</div>
		</div>
    
  );
}

export default Newdeck;

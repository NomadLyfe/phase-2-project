import React, { useEffect, useState } from "react";
import logo from '../Images/logo-no-background.png';

function Register() {
	const [registerData, setRegisterData] = useState({ id: '', password: '', confirmpassword: '' })
	const [users, setUsers] = useState(null)
	useEffect(() => {
		fetch('https://lotus-forge-db.onrender.com/users')
		.then(res => res.json())
		.then(userList => {
			setUsers(userList);
		})
	}, [])
	
	function handleChange (e) {
		setRegisterData({ ...registerData, [e.target.name]: e.target.value});
	}
	function handleSubmit (e) {
		e.preventDefault();
		const check = users.filter(user => user.id === registerData.id);
		if (check.length === 0 && registerData.password === registerData.confirmpassword) {
			fetch('https://lotus-forge-db.onrender.com/users', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ "id": registerData.id, "password": registerData.password })
			})
			.then(res => res.json())
			.then(() => {
				setRegisterData({ id: '', password: '', confirmpassword: '' });
				alert('\nCongratulations, You have successfully registered an account! Please go to the "Log In" page to log in.');
			});
		} else if (registerData.password !== registerData.confirmpassword) {
			alert("\nYour passwords did not match!")
		} else {
			alert("\nThat username is already taken!")
		}
	}
	return (
		<div>
      <img src={logo} alt='logo' className='loginlogo' />
			<form onSubmit={handleSubmit} className='loginform'>
				<label id='name'>Username</label>
				<input type='text' name="id" onChange={handleChange} value={registerData.id} />
				<br />
				<label id='password'>Make a password:</label>
				<input type='password' name="password" onChange={handleChange} value={registerData.password} />
				<br />
				<label id='password'>Confirm your password:</label>
				<input type='password' name="confirmpassword" onChange={handleChange} value={registerData.confirmpassword} />
				<br />
				<button>Register</button>
			</form>
    </div>
	);
}

export default Register;

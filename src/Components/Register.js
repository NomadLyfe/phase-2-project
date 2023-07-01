import React, { useEffect, useState } from "react";
import logo from '../Images/logo-no-background.png';

function Register() {
	const [registerData, setRegisterData] = useState({ name: '', password: '', confirmpassword: '' })
	const [users, setUsers] = useState(null)
	useEffect(() => {
		fetch('http://localhost:3001/users')
		.then(res => res.json())
		.then(users => setUsers(users));
	}, [users])
	
	function handleChange (e) {
		setRegisterData({ ...registerData, [e.target.name]: e.target.value});
	}
	function handleSubmit (e) {
		e.preventDefault();
		const check = users.filter(user => user.name === registerData.name);
		if (check.length === 0 && registerData.password === registerData.confirmpassword) {
			fetch('http://localhost:3001/users', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ "name": registerData.name, "password": registerData.password })
			})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				setRegisterData({ name: '', password: '', confirmpassword: '' });
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
				<input type='text' name="name" onChange={handleChange} value={registerData.name} />
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

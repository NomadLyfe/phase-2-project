import React from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Login({ handleSubmit, handleChange, logindata }) {
  return (
    <div className='loginpage'>
			<img src={logo} alt='logo' className='loginlogo' />
			<form onSubmit={handleSubmit} className='loginform'>
				<label id='username'>Username</label>
				<input type='text' onChange={handleChange} value={logindata.username} />
				<br />
				<label id='password'>Password</label>
				<input type='password' onChange={handleChange} value={logindata.password} />
				<br />
				<button>Log In</button>
			</form>
    </div>
  );
}

export default Login;

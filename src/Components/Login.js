import React from 'react';
import logo from '../Images/logo-no-background.png';
import '../css files/App.css';

function Login({ handleSubmit, handleChange, logindata, user }) {
  return (
    <div className='loginpage'>
			<img src={logo} alt='logo' className='loginlogo' />
			{!user ? <form onSubmit={handleSubmit} className='loginform'>
				<label id='name'>Username</label>
				<input type='text' onChange={handleChange} value={logindata.name} />
				<br />
				<label id='password'>Password</label>
				<input type='password' onChange={handleChange} value={logindata.password} />
				<br />
				<button>Log In</button>
			</form>: <p>Congratulations! You are logged in!</p>}
    </div>
  );
}

export default Login;

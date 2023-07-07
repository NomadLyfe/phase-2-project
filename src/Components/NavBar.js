import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user, handleLogout, setSelectedCard, setSearchedCard, setCommander, setCardList }) {
	function handeleGoBack () {
		setCommander(null);
		setSearchedCard(null);
		setSelectedCard(null);
		setCardList([]);
	}
	return (
		<nav>
			<NavLink to="/home">Home</NavLink>
			{!user ? <NavLink to="/login">Log In</NavLink> : null}
			{user ? <NavLink exact to="/decks" onClick={handeleGoBack}>My Decks</NavLink> : null}
			{user ? <Link to="/login" onClick={handleLogout}>Log Out</Link> : null}
			{!user ? <NavLink to="/register">Register</NavLink> : null}
		</nav>
	);
}

export default NavBar;
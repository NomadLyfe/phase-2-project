import React from "react";
import { NavLink, Link } from "react-router-dom";

function NavBar({ user, commander, handleLogout, setSelectedCard, setSearchedCard, setCommander, setCardList }) {
	function handeleGoBack () {
		setCommander(null);
		setSearchedCard(null);
		setSelectedCard(null);
		setCardList([]);
	}
	return (
		<nav>
			<NavLink exact to="/">Home</NavLink>
			{!user || !commander ? <NavLink exact to="/login">Log In</NavLink> : null}
			{user ? <NavLink exact to="/mydecks" onClick={handeleGoBack}>My Decks</NavLink> : null}
			{user ? <Link exact to="/login" onClick={handleLogout}>Log Out</Link> : null}
		</nav>
	);
}

export default NavBar;
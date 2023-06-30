import React from "react";

function NavBar({ onChangePage}) {
    
    function handleLinkClick(e) {
        e.preventDefault()
        onChangePage(e.target.pathname)
    }
    
    return (
        <nav>
            <a onClick={handleLinkClick} href="/">Log In</a>
            <a onClick={handleLinkClick} href="/about">My Deck</a>
            <a onClick={handleLinkClick} href="/projects">Log Out</a>
        </nav>
    );
}

export default NavBar;
import React from "react";
import { Link } from "react-router-dom";

function AllDecks ({ decks }) {
	let renderedDecks = null;
	if (decks) {
		renderedDecks = decks.map(deck => {
			const link = `/decks/${deck.id}`;
			return (
				<div key={deck.name}>
					<Link to={link} className='alldeck'><span>{deck.id}</span></Link>
				</div>
			)
		})
	}
	return (
		<div className="allDecks">
    	{renderedDecks}
    </div>
	);
}

export default AllDecks;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AllDecks () {
	const [decks, setDecks] = useState(null);
	useEffect(() => {
		fetch("http://localhost:3001/decks")
		.then(res => res.json())
		.then(decks => setDecks(decks))
	}, []);
	console.log(decks);
	let renderedDecks = null;
	if (decks) {
		const renderedDecks = decks.map(deck => {
			const link = `/mydecks/${deck.name}`;
			return (
				<div className='delAndLink'>
					<button className='deletebtn'>Delete</button>
					<Link exact to={link} key={deck.name} className='deck'><span>{deck.name}</span></Link>
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
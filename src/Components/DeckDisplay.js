import React, { useEffect } from 'react';
import '../css files/App.css';

function DeckDisplay({ searchedCard, setSearchedCard, cardList, setCardList, handleMouseOver, commander }) {
	const types = ['Planeswalker', 'Creature', 'Sorcery', 'Instant', 'Artifact', 'Enchantment', 'Land'];
	useEffect(() => {
		setCardList([...cardList, searchedCard]);
	}, [searchedCard]);
	const deckCards = types.map(type => {
		const reactCardsByType = cardList.map(card => {
			if (!card) return <div className='noCards' key={card}></div>
			return (
				<div key={card.name}>
					{card && card.type_line.includes(`${type}`) ? <img src={card.image_uris.normal} className="deckCard" alt={card.name} onMouseOver={handleMouseOver} /> : null}
				</div>
			)
		})
		const cardsByType = cardList.filter(el => {
			if (!el) return false;
			return el.type_line.includes(`${type}`)
		})
		return (
			<div key={type}>
				<h3>
					{type === 'Sorcery' ? 'Sorcerie' : type}s ({cardsByType.length})
				</h3>
				<div className='cardsByType'>
					{reactCardsByType}
				</div>
			</div>
		)
	});
  return (
    <div className='deckwrapper'>
			<div>
				<h3>
					Commander ({commander.length})
				</h3>
				<div>
					<img src={commander.image_uris.normal} className="deckCard" alt={commander.name} onMouseOver={handleMouseOver} />
				</div>
			</div>
			{deckCards}
    </div>
  );
}

export default DeckDisplay;

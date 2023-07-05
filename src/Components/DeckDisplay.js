import React, { useEffect } from 'react';
import '../css files/App.css';
import { useParams } from "react-router-dom";

function DeckDisplay({ searchedCard, cardList, setCardList, handleMouseOver, commander, owner, user, deleteDeckCard }) {
	const types = ['Planeswalker', 'Creature', 'Sorcery', 'Instant', 'Artifact', 'Enchantment', 'Land'];
	const params = useParams();
	useEffect(() => {
		setCardList([...cardList, searchedCard]);
	}, [searchedCard]);
	
	let changeableCardList = cardList.filter(card => card !== null);

	const cardTypes = types.map(type => {

		const numberOfCardsByType = changeableCardList.filter(el => {
			if (!el) return false;
			return el.type_line.includes(`${type}`)
		})
		if (numberOfCardsByType.length < 1) return null

		const reactCardsByType = changeableCardList.map(card => {
			if (!card) return <div className='noCards' key={card}></div>
			if (card.type_line.includes(`${type}`)) {
				changeableCardList = changeableCardList.filter(el => el.name !== card.name)
			}
			return (
				<div key={card.name} className='deckCardContainer'>
					{card && card.type_line.includes(`${type}`) ? <img src={card.image_uris.png} className="deckCard" alt={card.name} onMouseOver={handleMouseOver} /> : null}
					{card && card.type_line.includes(`${type}`) && params.id && (user === owner) ? <button className='cardDeleteBtn' onClick={(e) => deleteDeckCard(e, card, params)}>Delete</button> : null}
					{card && card.type_line.includes(`${type}`) && params.id && (user === owner) ? <button className='cardQuantBtn'>x 1</button> : null}
				</div>
			)
		})

		return (
			<div key={type}>
				<h3>
					{type === 'Sorcery' ? 'Sorcerie' : type}s ({numberOfCardsByType.length})
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
					Commander (1)
				</h3>
				{commander ? <div>
					<img src={commander.image_uris.normal} className="deckCardContainer" alt={commander.name} onMouseOver={handleMouseOver} />
				</div> : null}
			</div>
			{cardTypes}
    </div>
  );
}

export default DeckDisplay;

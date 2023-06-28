import React, { useEffect,  useState } from 'react';
import logo from '../Images/logo-no-background.png';
import Header from './Header.js'
import '../css files/App.css';

function App() {
  const [cards, setCards] = useState(null);
  return (
    <div className="App">
      <Header cards={cards} setCards={setCards} />
    </div>
  );
}

export default App;

import React, { useState } from 'react'

import CharacterCreation from './views/CharacterCreation.jsx';
import { CharacterData } from './types/character';
import { Enemy } from './game/characters.js';
import { createPlayerInstance, createThug } from './game/character-factory.js';

import BattleScene from './views/BattleScene.jsx';
import HomeScreen from './views/HomeScreen.jsx';
import InnScene from './views/InnScene.jsx';
import OutdoorConfrontation from './views/OutdoorConfrontation.jsx';

import './App.css'

function App() {

  const [ view, setView ] = useState("home");
  const [ character, setCharacter ] = useState(null);
  type EnemyType = ReturnType<typeof Enemy.create>;
  const [ enemies, setEnemies ] = useState<EnemyType>([]);

  const startNewGame = () => setView("characterCreation");
  const loadGame = () => alert("Load game not implemented yet!");

  const onCreateCharacter = (characterData: CharacterData) => {
    const newCharacter = createPlayerInstance(characterData);
    setCharacter(newCharacter);
    setView("innScene");
  };

  const onStepOutside = () => {
    setView("outdoorConfrontation");
  };

  const onEnterBattle = () => {
    const enemyGroup = [ createThug('Maritius'), createThug('Ronald') ];
    setEnemies(enemyGroup);
    setView("battleScene");
  };

  const onBattleEnd = () => {
    alert("Battle finished (placeholder)");
    setView("innScene");
  };

  let content;
  switch (view) {
    case "home":
      content = <HomeScreen startNewGame={startNewGame} loadGame={loadGame} />;
      break;
    case "characterCreation":
      content = <CharacterCreation onSubmit={onCreateCharacter} />;
      break;
    case "innScene":
      content = <InnScene character={character} onContinue={onStepOutside} />;
      break;
    case "outdoorConfrontation":
      content = <OutdoorConfrontation character={character} onEnterBattle={onEnterBattle} />;
      break;
    case "battleScene":
      content = <BattleScene player={character} enemies={enemies} onBattleEnd={onBattleEnd} />;
      break;
    default:
      content = <div>Unknown view: {view}</div>;
  }

  return <div className="App">{content}</div>
}

export default App

import React from 'react';
import Button from '../components/Button';
import GameFrame from './GameFrame';

const OutdoorConfrontation = ({ character, onEnterBattle }) => (
  <GameFrame character={character}>
    <h2>Beyond Haven</h2>
    <p>
      Leaving the safety of town, you step onto a shadowed path. The crisp air shifts as the familiar hum of town life fades behind you.
    </p>
    <p>
      Soon, the silence breaks: hostile figures emerge from the gloom, and the tension of an impending battle hangs heavy in the air.
    </p>
    <p>
      With your resolve steeled, you prepare to face the challenge.
    </p>
    <Button onClick={onEnterBattle}>Engage the Enemy</Button>
  </GameFrame>
);

export default OutdoorConfrontation;
import { useGame } from "../context/GameContext";
import Button from '../components/Button';

export default function CharacterSelect({ onStart }) {
    const { setCharacterClass } = useGame();

    function chooseClass(className) {
        setCharacterClass(className);
        onStart();
    };

    return (
        <div>
            <h2>Choose Your Class</h2>
            <Button onClick={ () => chooseClass('Medium') }>Medium</Button>
            <Button onClick={ () => chooseClass('Summoner') }>Summoner</Button>
            <Button onClick={ () => chooseClass('Thaumaturgist') }>Thaumaturgist</Button>
        </div>
    );
};
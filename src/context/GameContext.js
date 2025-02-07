import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [ characterClass, setCharacterClass ] = useState(null);
    const [ inventory, setInventory ] = useState([]);

    return (
        <GameContext.Provider value = {{ characterClass, setCharacterClass, inventory, setInventory }}>
            { children }
        </GameContext.Provider>
    );
};

export function useGame() {
    return useContext(GameContext);
};
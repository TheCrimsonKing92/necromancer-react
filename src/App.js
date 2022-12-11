import React, { useReducer } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ClassDescription from './components/ClassDescription';
import SkillDescription from './components/SkillDescription';

import ACTIONS from './constants/Actions';
import SCENES from './constants/Scenes';
import DEFAULT_GAME_STATE from './constants/DefaultGameState';

import './App.css';

const { ADD_SKILL, CHANGE_SCENE, DISPLAY_CLASS, DISPLAY_SKILL, SET_CLASS } = ACTIONS;

const initialState = {
  footer: null,
  game: DEFAULT_GAME_STATE    
};

console.log("Initial app state: ", initialState);

const appReducer = (state, action) => {
  switch (action.type) {
      case ADD_SKILL:
        // TODO: Check if we *can* add it, deduct cost
        const mutation = {
          ...state,
          game: {
            ...state.game,
            player: {
              ...state.game.player,
              skills: {
                ...state.game.player.skills,
                [action.payload.name]: action.payload
              }
            }
          }
        };

        if (state.game.scene === SCENES.CHOOSE_SKILL && Object.keys(state.game.player.skills).length === 0) {
          mutation.game.scene = "WORLD_MAP"; // ?
          console.log("Mutated state: ", mutation);
        }

        return mutation;
      case CHANGE_SCENE:
          return {
              ...state,
              game: {
                  ...state.game,
                  scene: action.payload
              }
          };
      case DISPLAY_CLASS:
        console.log("DISPLAY_CLASS with payload: ", action.payload);
        if (action.payload === null) {
          return {
            ...state,
            footer: null
          };
        }

        return {
          ...state,
          footer: <ClassDescription class={action.payload} />
        };

      case DISPLAY_SKILL:
        if (action.payload === null) {
            return {
                ...state,
                footer: null
            };
        }

        const content = <SkillDescription skill={action.payload} />;

        return {
            ...state,                
            footer: content
        };
      case "loadGame":
          return {
              ...state,
              game: action.payload
          };
      case "newGame":
          return { 
              ...initialState
          };
      case SET_CLASS:
          return {
              ...state,
              game: {
                  ...state.game,
                  player: {
                      ...state.game.player,
                      class: action.payload
                  },
                  scene: SCENES.CHOOSE_SKILL
              }
          };
      default:
          throw new Error("Unexpected action type " + action.type + " in appReducer");
  }
};

const App = () => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  const { footer, game } = appState;

  return (
    <BrowserRouter>
      <Container>
        <Header gameStarted={false}/>
        <Main dispatch={dispatch} game={game} />
        <Footer content={footer} />
      </Container>
    </BrowserRouter>
  );
};

export default App;

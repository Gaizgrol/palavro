import './App.css';
import Header from './components/Header/Header';
import Game from './components/Game/Game';
import { useState } from 'react';

function App() {

	const [gameMode, setGameMode] = useState(5);

	return (
		<div className="App">
			<Header
				gameMode={gameMode}
				onGameModeChange={(gm: number) => setGameMode(gm)}
			/>
			<Game
				gameMode={gameMode}
			/>
		</div>
	);
}

export default App;

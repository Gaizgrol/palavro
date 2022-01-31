import './GameModes.css';

export interface GameModeProps {
    selected: number;
    onGameModeChange?: ( newGameMode: number ) => any;
}

export default function GameModes( props: GameModeProps ) {

    const { selected, onGameModeChange } = props;

    return (<>
        <ul className="GameModes">
            <button
                style={{ color: selected === 5 ? 'red' : 'black' }}
                onClick={() => onGameModeChange?.( 5 )}
            >
                5 letras
            </button>
            <button
                style={{ color: selected === 6 ? 'red' : 'black' }}
                onClick={() => onGameModeChange?.( 6 )}
            >
                6 letras
            </button>
            <button
                style={{ color: selected === 7 ? 'red' : 'black' }}
                onClick={() => onGameModeChange?.( 7 )}
            >
                7 letras
            </button>
        </ul>
    </>)
}
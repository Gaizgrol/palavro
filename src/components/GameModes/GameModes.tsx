import './GameModes.css';

export interface GameModeProps {
    selected: number;
    onGameModeChange?: ( newGameMode: number ) => any;
}

export default function GameModes( props: GameModeProps ) {

    const { selected, onGameModeChange } = props;

    return (<>
        <div className="GameModes">
            <div className="gm-buttons">
                <div className='gm-separator'></div>
                <div
                    className={ `gm gm-${selected !== 5 ? 'un' : ''}selected` }
                    onClick={() => onGameModeChange?.( 5 )}
                >
                    5 letras
                </div>
                <div className='gm-separator'></div>
                <div
                    className={ `gm gm-${selected !== 6 ? 'un' : ''}selected` }
                    onClick={() => onGameModeChange?.( 6 )}
                >
                    6 letras
                </div>
                <div className='gm-separator'></div>
                <div
                    className={ `gm gm-${selected !== 7 ? 'un' : ''}selected` }
                    onClick={() => onGameModeChange?.( 7 )}
                >
                    7 letras
                </div>
                <div className='gm-separator'></div>
            </div>
            <div className='gm-content'>
                <p>
                    Em construção!
                </p>
            </div>
        </div>
    </>)
}
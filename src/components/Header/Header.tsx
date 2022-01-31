import Modal from 'react-modal';
import './Header.css';

import {
    IoBulbOutline,
    IoLogoGithub,
    IoHelpCircleOutline,
    IoGrid
} from 'react-icons/io5'
import { useState } from 'react';
import GameModes from '../GameModes/GameModes';

export interface HeaderProps {
    gameMode: number;
    onGameModeChange: ( gm: number ) => any;
}

export default function Header( props: HeaderProps ) {

    const [showGameModes, setShowGameModes] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const { gameMode, onGameModeChange } = props;

    return (<>
        {
        // Ajuda
        }
        <Modal
            isOpen={showHelp}
            onRequestClose={() => setShowHelp(false)}
        >
            Ajuda!
        </Modal>
        {
        // Modos de jogo
        }
        <Modal
            isOpen={showGameModes}
            onRequestClose={() => setShowGameModes(false)}
        >
            <GameModes
                selected={gameMode}
                onGameModeChange={onGameModeChange}
            />
        </Modal>
        <header className="Header">
            <div className='edges'>
                <IoLogoGithub
                    size='1.75em'
                    title='Código fonte'

                    onClick={() => {
                        window.open( 'https://github.com/Gaizgrol/palavro', '_blank' );
                    }}
                />
                <IoHelpCircleOutline
                    size='1.75em'
                    title='Ajuda'
                    
                    onClick={() => {
                        setShowHelp(true);
                    }}
                />
            </div>
            <h1>
                PALAVRO
            </h1>
            <div className='row edges'>
                <IoBulbOutline
                    size='1.75em'
                    title='Mudar tema'

                    onClick={() => {
                        console.log( 'Alterar tema' );
                    }}
                />
                <IoGrid
                    size='1.75em'
                    title='Opções'
                    
                    onClick={() => {
                        setShowGameModes(true);
                    }}
                />
            </div>
        </header>
    </>);
}
import './Header.css';

import {
    IoBulbOutline,
    IoLogoGithub,
    IoHelpCircleOutline,
    IoGrid
} from 'react-icons/io5'

export default function Header() {
    return (
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
                        console.log( 'Ajuda' );
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
                        console.log( 'Opções' );
                    }}
                />
            </div>
        </header>
    )
}
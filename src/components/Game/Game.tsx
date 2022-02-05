import './Game.css';
import { useEffect, useState } from "react";
import seed from 'seedrandom';
import Keyboard, { KeyboardInfo } from "../Keyboard/Keyboard";
import { LetterInfo } from "../Letter/Letter";
import Word, { similar, WordInfo, wordStatus } from "../Word/Word";
import { NumberDict } from "../..";

import pal from '../../providers/palavras';

const {
    '5': pal5,
    '6': pal6,
    '7': pal7
} = pal;

export const letterFilteredWords: NumberDict<string[]> = {
    5: Object.keys(pal5),
    6: Object.keys(pal6),
    7: Object.keys(pal7)
};

// O gerador pseudo-aleatório terá os mesmos resultados em um determinado
// dia, porém quando o dia mudar ele também mudará
const now = new Date();
const generate = seed(`Palavro! ${
    (now.getFullYear()+'').padStart(4, '0')
}-${
    (now.getMonth()+1+'').padStart(2, '0')
}-${
    (now.getDate()+'').padStart(2, '0')
}`);

const char = ( str: string ) => str.toLowerCase().charCodeAt(0);

const fetchWord = ( size: number ) => {
    const words = letterFilteredWords[ size ] ?? ['x'.repeat(size)];
    return words[ Math.round( generate.double() * (words.length-1) ) ];
};

const dayWords: NumberDict<string[]> = {
    5: [ fetchWord(5), fetchWord(5), fetchWord(5) ],
    6: [ fetchWord(6), fetchWord(6), fetchWord(6) ],
    7: [ fetchWord(7), fetchWord(7), fetchWord(7) ]
};

function createGameModeObj<T>( value: T ): NumberDict<T> {
    return {
        5: value,
        6: value,
        7: value
    }
};

export interface GameProps {
    gameMode: number;
}

export default function Game( props: GameProps ) {
    
    const { gameMode } = props;
    const run = 0;
    
    // 5 letras - 6 tentativas
    // 6 letras - 5 tentativas
    // 7 letras - 4 tentativas
    const maxTries: NumberDict<number> = {
        5: 6,
        // Modos mais difíceis
        6: 5,
        7: 5
    };

    // Palavra selecionada
    const [actualTry, setActualTry] = useState( createGameModeObj(0) );
    
    // Texto da palavra selecionada
    const [text, setText] = useState( createGameModeObj('') );
    
    // Fim de jogo?
    const [gameEnd, setGameEnd] = useState( createGameModeObj(false) );
    
    // Palavras das tentativas anteriores
    const [tries, setTries] = useState({
        5: [],
        6: [],
        7: []
    } as NumberDict<string[]>);
    
    // Informações das letras usadas nas tentativas
    const [letterInfo, setLetterInfo] = useState({
        5: {},
        6: {},
        7: {}
    } as NumberDict<KeyboardInfo> );

    // Deletar uma letra
    const backspace = () => {
        if ( !text[gameMode].length )
            return;
        
        text[gameMode] = text[gameMode].substring( 0, text[gameMode].length - 1 )
        setText( {...text} );
    }

    // Tentar submeter uma palavra
    const enter = () => {
        const submission = text[gameMode];

        // Não finalizou a palavra
        if ( submission.length !== dayWords[gameMode][run].length )
            return;

        // Finalizou a palavra e vai pular para a próxima tentativa
        actualTry[gameMode]++;
        setActualTry( {...actualTry} );
        
        tries[gameMode].push( submission );
        setTries( {...tries} );
        
        text[gameMode] = '';
        setText( {...text} );

        // Palavra correta
        if ( [...submission].every( (letter, pos) => similar( letter, dayWords[gameMode][run][pos] ) ) )
            return finish( true );
        // Esgotou a quantidade de tentativas
        if ( actualTry[gameMode] >= maxTries[gameMode] )
            return finish( false );
    }

    // Lógica de fim de jogo
    const finish = ( win: boolean ) => {
        gameEnd[gameMode] = true;
        setGameEnd({ ...gameEnd });
        if ( win )
            alert( `Parabéns! Você conseguiu na tentativa ${actualTry[gameMode]}/${maxTries[gameMode]}` );
        else
            alert( `Não foi dessa vez!\nA palavra era ${dayWords[gameMode][run].toUpperCase()}` );
    }

    // Clique em uma determinada tecla
    const letterClick = ( key: string ) => {
        // Já terminou o jogo: ignora
        if ( gameEnd[gameMode] )
            return;

        if ( key === 'Backspace' )
            backspace();
        else if ( key === 'Enter' )
            enter();
        // Verifica se é uma letra válida e prossegue
        // caso ainda tenha espaço
        else if (
            char(key) >= char('a') && char(key) <= char('z') &&
            key.length === 1 && text[gameMode].length < dayWords[gameMode][run].length
        ){
            text[gameMode] += key[0];
            setText( {...text} );
        }

    }

    // Troca de tentativa = Submeteu resposta
    useEffect( () => {
        // Informações sobre as letras digitadas
        const info: KeyboardInfo = {};
        
        // Pega o status mais importante de cada
        // letra digitada anteriormente
        tries[gameMode].forEach( attempt => {
            // Informações de status da letra
            wordStatus( dayWords[gameMode][run], attempt ).forEach( (st, pos) => {
                const letter = attempt[pos];
                info[letter] ??= LetterInfo.DOESNT_EXIST;
                // Caso o estado seja "mais importante", atualize.
                info[letter] = ( st > info[letter] ? st : info[letter] );
            });
        });

        letterInfo[gameMode] = info;
        setLetterInfo( {...letterInfo} );
    }, [tries]);

    // Configura entrada de texto
    document.onkeydown = ( ev ) => {
        if ( ev.key === 'Backspace' )
            ev.preventDefault();
        letterClick( ev.key );
    }

    return (<>
        <div className="words">
            {Array(maxTries[gameMode]).fill(' ').map( (_, i) =>
                <Word
                    key={`word-${i}`}
                    correct={dayWords[gameMode][run]}
                    position={text[gameMode].length}
                    state={
                        ( actualTry[gameMode] > i ) ? WordInfo.SUBMITTED : (
                        ( actualTry[gameMode] < i || gameEnd[gameMode] ) ? WordInfo.NOT_REACHED :
                            WordInfo.SELECTED )
                    }
                    text={actualTry[gameMode] === i ? text[gameMode] : tries[gameMode][i] ?? ''}
                />
            )}
        </div>
        <Keyboard
            letterInfo={letterInfo[gameMode]}
            onLetterClick={letterClick}
        />
    </>);
}
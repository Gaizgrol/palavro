import { useEffect, useState } from "react";
import Keyboard, { KeyboardInfo } from "../Keyboard/Keyboard";
import { LetterInfo } from "../Letter/Letter";
import Word, { letterCount, WordInfo, wordStatus } from "../Word/Word";

const char = ( str: string ) => str.toLowerCase().charCodeAt(0);

// #TODO
const fetchWord = () => 'salada';

export default function Game() {
    
    const word = fetchWord();
    
    // 5 letras - 6 tentativas
    // 6 letras - 5 tentativas
    // 7 letras - 4 tentativas
    const maxTries = 11 - word.length;
    
    // Palavra selecionada
    const [actualTry, setActualTry] = useState( 0 );
    // Texto da palavra selecionada
    const [text, setText] = useState( '' );
    // Fim de jogo?
    const [gameEnd, setGameEnd] = useState( false );
    // Palavras das tentativas anteriores
    const [tries, setTries] = useState( [] as string[] );
    // Informações das letras usadas nas tentativas
    const [letterInfo, setLetterInfo] = useState( {} as KeyboardInfo );

    // Deletar uma letra
    const backspace = () => {
        if ( !text.length )
            return;
        setText( text.substring( 0, text.length - 1 ) );
    }

    // Tentar submeter uma palavra
    const enter = () => {
        // Não finalizou a palavra
        if ( text.length !== word.length )
            return;
        
        // Finalizou a palavra e vai pular para a próxima tentativa
        const nextTry = actualTry+1;
        setActualTry( nextTry );
        setTries( [...tries, text] );
        setText( '' );

        // Palavra correta
        if ( text === word )
            return finish( true );
        // Esgotou a quantidade de tentativas
        if ( nextTry >= maxTries )
            return finish( false );
    }

    // Lógica de fim de jogo
    const finish = ( win: boolean ) => {
        setGameEnd( true );
        if ( win )
            alert( 'Parabéns!' );
        else
            alert( 'Não foi dessa vez!' );
    }

    // Clique em uma determinada tecla
    const letterClick = ( key: string ) => {
        // Já terminou o jogo: ignora
        if ( gameEnd )
            return;

        if ( key === 'Backspace' )
            backspace();
        else if ( key === 'Enter' )
            enter();
        // Verifica se é uma letra válida e prossegue
        // caso ainda tenha espaço
        else if (
            char(key) >= char('a') && char(key) <= char('z') &&
            key.length === 1 && text.length < word.length
        )
            setText( text + key[0] );
    }

    // Troca de tentativa = Submeteu resposta
    useEffect( () => {
        // Informações sobre as letras digitadas
        const info: KeyboardInfo = {};
        
        // Pega o status mais importante de cada
        // letra digitada anteriormente
        tries.forEach( attempt => {
            // Informações de status da letra
            wordStatus( word, attempt ).forEach( (st, pos) => {
                const letter = attempt[pos];
                info[letter] ??= LetterInfo.DOESNT_EXIST;
                // Caso o estado seja "mais importante", atualize.
                info[letter] = ( st > info[letter] ? st : info[letter] );
            });
        });

        setLetterInfo( info );
    }, [tries]);

    // Configura entrada de texto
    document.onkeydown = ( ev ) => letterClick( ev.key );

    return (<>
        {Array(maxTries).fill(' ').map( (_, i) =>
            <Word
                key={`word-${i}`}
                correct={word}
                position={text.length}
                state={
                    ( actualTry > i ) ? WordInfo.SUBMITTED : (
                    ( actualTry < i || gameEnd ) ? WordInfo.NOT_REACHED :
                        WordInfo.SELECTED )
                }
                text={actualTry === i ? text : tries[i] ?? ''}
            />
        )}
        <Keyboard
            letterInfo={letterInfo}
            onLetterClick={letterClick}
        />
    </>);
}
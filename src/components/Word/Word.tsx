import './Word.css';
import Letter, { LetterInfo } from "../Letter/Letter";

export enum WordInfo {
    NOT_REACHED,
    SELECTED,
    SUBMITTED
}

export interface WordProps {
    correct: string;
    position: number;
    state: WordInfo;
    text: string;
}

export const letterCount = ( word: string ) => {
    const data: { [key: string]: number } = {};
    for ( const letter of word ) {
        data[letter] ??= 0;
        data[letter]++;
    }
    return data;
}

export const wordStatus = ( correct: string, text: string ) =>
{
    const { DOESNT_EXIST, RIGHT_PLACE, WRONG_PLACE } = LetterInfo;
    
    // Pega informação de letras da palavra
    const count = letterCount( correct );
    // Assume que ninguém existe
    const status: LetterInfo[] = Array( correct.length ).fill( DOESNT_EXIST );
    
    return status.map( ( st, pos ) => {
        // Verifica existentes nas posições corretas
        const letter = text[pos];
        if ( letter === correct[pos] ) {
            count[letter]--;
            return RIGHT_PLACE;
        } else
            return st;
    }).map( ( st, pos ) => {
        // Verifica existentes nas posições erradas
        const letter = text[pos];
        if ( st !== RIGHT_PLACE && count[letter] && correct.includes(letter) ) {
            count[letter]--;
            return WRONG_PLACE;
        } else
            return st;
    });
}

export default function Word( props: WordProps ) {

    const { correct, position, state, text } = props;

    let ws = ( state !== WordInfo.SUBMITTED ) ?
        Array( correct.length ).fill( undefined ) :
        wordStatus( correct, text );

    return (
        <div className="Word">
            {ws.map( (status, i) =>
                <Letter
                    key={`word-${position}-${i}`}
                    disabled={state === WordInfo.NOT_REACHED}
                    exists={status}
                    selected={state === WordInfo.SELECTED && position === i}
                    letter={text[i] ?? ' '}
                />
            )}
        </div>
    );
}
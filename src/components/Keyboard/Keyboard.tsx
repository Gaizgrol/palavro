import Letter, { LetterInfo } from '../Letter/Letter'
import './Keyboard.css'

export interface KeyboardInfo {
    [key: string]: LetterInfo
}

interface KeyboardProps {
    letterInfo: KeyboardInfo;
    onLetterClick: ( key: string ) => any;
}

export default function Keyboard( props: KeyboardProps ) {

    const { letterInfo, onLetterClick } = props;

    const rows = [
        'qwertyuiop',
        'asdfghjkl+',
        '-zxcvbnm'
    ];

    return (
        <div className="Keyboard">
            {rows.map( (row, i) =>
                <div key={`keyboard-row-${i+1}`} className="keyboard-row">
                    {row.split('').map( letter =>
                        <Letter
                            exists={letterInfo[letter]}
                            key={`keyboard-${letter}`}
                            keyboard={true}
                            letter={letter}
                            click={() => {
                                onLetterClick(
                                    ( letter === '-' ) ? 'Backspace' : (
                                    ( letter === '+' ) ? 'Enter' : letter )
                                )
                            }}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
import './Letter.css';

export enum LetterInfo {
    DOESNT_EXIST,
    WRONG_PLACE,
    RIGHT_PLACE
}

export interface LetterProps {
    click?: any,
    disabled?: boolean,
    exists?: LetterInfo,
    letter?: string | null,
    selected?: boolean,
    keyboard?: boolean,
}

export default function Letter( props: LetterProps ) {

    const { click, disabled, exists, keyboard, letter, selected } = props;

    return (
        <div onClick={click}
            className={ `
                ${ keyboard ? 'keyboard' : 'game' }
                ${ selected ? 'selected' : '' }
                ${ disabled ? 'disabled' : '' }
                ${ ( !disabled && exists !== undefined ) ? (
                    ( exists === LetterInfo.RIGHT_PLACE ) ? 'right-place' : (
                    ( exists === LetterInfo.WRONG_PLACE ) ? 'wrong-place' : 'doesnt-exists' )
                ) + ' submitted' : '' }
                ${( letter === '+' ) ? 'key-enter' : (
                   ( letter === '-' ) ? 'key-back': '')}
            `}
        >
            {!disabled && props.letter?.toUpperCase()}
        </div>
    );
}
import './style.css';

export const ButtonSector = ({text, onClick}) => {
    return (
        <>
            <button type='button' className="btn-store btn" onClick={onClick}>{text}</button>
        </>
    )
}
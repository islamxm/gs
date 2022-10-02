import './Pl.scss';

const Pl = ({style, text, onClick, prev}) => {
    return (
        <div onClick={onClick} className="Pl" style={style}>
            {prev ? prev : text}
        </div>
    )
}

export default Pl;
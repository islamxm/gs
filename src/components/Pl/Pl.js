import './Pl.scss';

const Pl = ({style, text, onClick, prev, shadow}) => {
    return (
        <div onClick={onClick} className={"Pl" + (shadow ? ' shadow ' : '')} style={style}>
            {prev ? prev : text}
        </div>
    )
}

export default Pl;
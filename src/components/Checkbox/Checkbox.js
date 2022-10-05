import './Checkbox.scss';

const Checkbox = ({
    checked,
    name,
    id,
    onChange,
    text,
    shadow
}) => {



    return (
        <div className={"Checkbox" + (shadow ? ' shadow ' : '')}>
            <input onChange={onChange} id={id} name={name} type="checkbox" checked={checked}/>
            <label htmlFor={id} className="Checkbox__label">
                <div className="Checkbox__label_icon"></div>
                <div className="Checkbox__label_text">{text}</div>
            </label>
        </div>
    )
}

export default Checkbox;
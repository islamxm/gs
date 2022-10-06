import './Input.scss';

const Input = ({
    style,
    onChange,
    onBlur,
    value,
    disabled,
    error,
    placeholder,
    type,
    readOnly,
    shadow
}) => {
    return (
        <div className={"Input" + (error ? ' error ' : '') + (shadow ? ' shadow ' : '')} style={style}>
            <input 
                disabled={disabled}
                type={type} 
                value={value} 
                onChange={onChange} 
                onBlur={onBlur} 
                readOnly={readOnly}
                placeholder={placeholder}
                className="Input__el" />
            {
                error ? (
                    <div className="Input__error">
                        {error}
                    </div>
                ) : null
            }
            
        </div>
    )
}

export default Input;
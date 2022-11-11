import './Input.scss';
import {motion} from 'framer-motion';

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
    shadow,
    onClick,
    name,
    showErrorText
}) => {
    return (
        <div onClick={onClick} className={"Input" + (error ? ' error ' : '') + (shadow ? ' shadow ' : '')} style={style}>
            <input 
                disabled={disabled}
                type={type} 
                value={value} 
                name={name}
                onChange={onChange} 
                onBlur={onBlur} 
                readOnly={readOnly}
                placeholder={placeholder}
                className="Input__el" />
            {
                error && showErrorText ? (
                    <div  
                        className="Input__error">
                        {error}
                    </div>
                ) : null
            }
            
        </div>
    )
}

export default Input;
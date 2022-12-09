import './Input.scss';
import {motion} from 'framer-motion';
import { useState } from 'react';
import { useEffect, useRef } from 'react';

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
    const [validFocus, setValidFocus] = useState(false)
    const inpRef = useRef()
    const handleChange = (e) => {
        onChange(e)
    }

    useEffect(() => {
        if(value) {
            setValidFocus(true)
        } else {
            setValidFocus(false) 
        }
    }, [value])

    const focusInp = () => {
        inpRef.current.focus()
    }

    return (
        <div onClick={onClick} className={"Input" + (error ? ' error ' : '') + (shadow ? ' shadow ' : '')} style={style}>
            {
                placeholder ? (
                    <div onClick={focusInp} className={"Input__label" + (validFocus ? ' valid ' : '')}>{placeholder}</div>
                ) : null
            }
            
            <input 
                ref={inpRef}
                disabled={disabled}
                type={type} 
                value={value} 
                name={name}
                onChange={(e) => handleChange(e)} 
                onBlur={onBlur} 
                readOnly={readOnly}
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
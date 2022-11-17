import './Text.scss';
import { useRef, useEffect, useState } from 'react';


const Text = ({
    onChange,
    name,
    value,
    id,
    placeholder,
    height,
    shadow
    
}) => {
    const inpRef = useRef()
    const [validFocus, setValidFocus] = useState(false)

    useEffect(() => {
        if(value) {
            setValidFocus(true)
        } else {
            setValidFocus(false)
        }
    }, [value])

    const focusInp = () => {
        inpRef?.current?.focus()
    }

    return (
        <div className="TextWrap">
            <div onClick={focusInp} className={"TextWrap__label" + (validFocus ? ' valid ' : '')}>
                {placeholder}
            </div>
            <textarea 
            onChange={onChange}
            style={{height: height}} 
            name={name} 
            value={value} 
            id={id} 
            className={"Text" + (shadow ? ' shadow ' : '')} 
            // placeholder={placeholder}
            
            >

            </textarea>
        </div>
        
    )
}

export default Text;
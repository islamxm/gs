import { useState } from 'react';
import './Button.scss';



const Button = ({text, before, after, justify, variant, type, styles, onClick}) => {
    

    const variantSw = () => {
        switch(variant) {
            case 'default':
                return 'default'
            case 'danger':
                return 'danger'
            default:
                return 'default'
        }
    }


    return (
        <button onClick={onClick} type={type} className={"Button " + variantSw()} style={{justifyContent: justify, ...styles}}>
            {
                before ? (
                    <span className="Button__before">{before}</span>
                ) : null
            }
            <div className="Button__text">{text}</div>
            {
                after ? (
                    <span className="Button__after">{after}</span>
                ) : null
            }
        </button>
    )
}

export default Button;
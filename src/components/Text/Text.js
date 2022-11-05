import './Text.scss';

const Text = ({
    onChange,
    name,
    value,
    id,
    placeholder,
    height,
    shadow
    
}) => {
    return (
        <textarea 
            onChange={onChange}
            style={{height: height}} 
            name={name} 
            value={value} 
            id={id} 
            className={"Text" + (shadow ? ' shadow ' : '')} 
            placeholder={placeholder}
            
            >

            </textarea>
    )
}

export default Text;
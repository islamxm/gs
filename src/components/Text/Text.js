import './Text.scss';

const Text = ({
    onChange,
    name,
    value,
    id,
    placeholder,
    height
    
}) => {
    return (
        <textarea style={{height: height}} name={name} value={value} id={id} className="Text" placeholder={placeholder}></textarea>
    )
}

export default Text;
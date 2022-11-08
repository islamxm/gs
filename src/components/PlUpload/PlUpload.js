import './PlUpload.scss';
import '../Pl/Pl.scss';

const PlUpload = ({style, text, onClick, prev, shadow, onChange, id, accept, multiple}) => {
    return (
        <div className={"PlUpload Pl" + (shadow ? ' shadow ' : '') + (prev ? ' nopadding ' : '')} style={style}>
            {
                prev ? (
                    <img src={prev} alt="" />
                ) : (
                    text
                )
            }
            <input multiple={multiple} onChange={onChange} type="file" id={id} accept={accept}/>
            <label htmlFor={id}></label>
        </div>
    )
}

export default PlUpload;
import './DefList.scss';
import Pl from '../../../../../components/Pl/Pl';

const DefList = ({head, addText, openModal, editModal}) => {
    return (
        <div className="DefList">
            <h3 className="DefList__head panel-label">{head}</h3>
            <div className="DefList__body">
                <div onClick={editModal} className="DefList__body_item panel">
                    Элемент 1
                </div>
                <div onClick={editModal} className="DefList__body_item panel">
                    Элемент 2
                </div>
            </div>
            <div className="DefList__add">
                <Pl onClick={openModal} style={{backgroundColor: '#fff'}} text={addText}/>
            </div>
        </div>
    )
}

export default DefList;
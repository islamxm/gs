import './TimeSelect.scss';
import { useEffect, useState } from 'react';
import EditTime from '../../../modals/editTime/EditTime';
import useModal from '../../../../../hooks/useModal';

const TimeSelect = ({list, selected, save}) => {
    const {visible, hideModal, showModal} = useModal();


    const [timeList, setTimeList] = useState([]);
    const [editIndex, setEditIndex] = useState(0);
    const [editValue, setEditValue] = useState();
    const [editRest, setEditRest] = useState(false);
    const [editName, setEditName] = useState('');

    useEffect(() => {
        setTimeList(list)
    }, [list])

    const openEdit = (index) => {
        setEditIndex(index);
        setEditValue(list[index].values)
        setEditName(list[index].name)
        setEditRest(list[index].rest)
        showModal()
    }



    return (
        <div className="TimeSelect">
            <EditTime save={save} name={editName} rest={editRest} editIndex={editIndex} values={editValue} visible={visible} close={hideModal}/>
            {
                timeList && timeList.length > 0 ? (
                    timeList.map((item, index) => (
                        <div onClick={() => openEdit(index)} className="TimeSelect__item" key={index}>
                            <div className="TimeSelect__item_name">{item.name}</div>
                            <div className="TimeSelect__item_value">
                                {
                                    !item.rest ? (
                                        <>
                                        {item.values.start}-{item.values.end}
                                        </>
                                    ) : (
                                        'Выходной'
                                    )
                                }
                            </div>
                        </div>
                    ))
                ) : null
            }
        </div>
    )
}

export default TimeSelect;
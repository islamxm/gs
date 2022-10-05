import './EditTime.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import Checkbox from '../../../../components/Checkbox/Checkbox';

const EditTime = ({editIndex, visible, close, values, save, name, rest}) => {
    
    const [startVal, setStartVal] = useState('')
    const [endVal, setEndVal] = useState('')
    const [disabled, setDisabled] = useState(!values?.start ? true : false);
    const [checked, setChecked] = useState(false)

    const closeModal = () => {
        setChecked(false)
        close();
    }

    useEffect(() => {
        setChecked(rest)
    }, [rest, visible])

    useEffect(() => {
        setStartVal(values?.start)
        setEndVal(values?.end)
        
    }, [values, visible])

    const handleWeekend = (e) => {
        setChecked(!checked);
        if(e.target.checked) {
            setStartVal(0);
            setEndVal(0);
            setDisabled(true);
        } else {
            setDisabled(false)
        }
    } 

    const handleSave = () => {
        if(startVal != 0 && endVal != 0) {
            const val = {
                name: name,
                values: {
                    start: startVal,
                    end: endVal
                },
                rest: checked
            }
            save(editIndex, val);
        } else {
            const val = {
                name: name,
                values: {
                    start: startVal,
                    end: endVal
                },
                rest: true
            }
            save(editIndex, val);
        }
        
        close()
    }





    return (
        <Modal className='Modal' open={visible} onCancel={closeModal}>
            
            <h2 className="Modal__head">Выбрать время</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <div className={"Modal__form_time" + (disabled ? ' disabled ' : '')}>
                        <TimePicker disabled={disabled}  hourPlaceholder='00' minutePlaceholder='00' className={"Modal__form_time_item"}  disableClock format='hh:mm' onChange={setStartVal} value={startVal} />
                        <span className='Modal__form_time_space'>-</span>
                        <TimePicker disabled={disabled} hourPlaceholder='00' minutePlaceholder='00' className={"Modal__form_time_item"}  disableClock format='hh:mm' onChange={setEndVal} value={endVal} />
                    </div>
                </div>
                <div className="Modal__form_row">
                    <Checkbox checked={checked} onChange={handleWeekend} id={'weekend'} text={'Выходной'}/>
                </div>
                <div className="Modal__form_action" style={{marginTop: 50}}>
                    <Button onClick={handleSave} text={'Сохранить'} before={<BsTrash/>} justify={'flex-start'} styles={{paddingTop: 20, paddingBottom: 20}}/>
                </div>
            </div>
        </Modal>
    )
}

export default EditTime;
import './EditTime.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import SaveIcon from '../../../../icons/SaveIcon/SaveIcon';
const EditTime = ({
    editIndex, 
    visible, 
    close, 
    values, 
    save, 
    name, 
    rest, 
    plate,
    enabledVal,
    ddisabledVal
}) => {
    
    const [startVal, setStartVal] = useState('')
    const [endVal, setEndVal] = useState('')
    const [disabled, setDisabled] = useState(false);
    const [checked, setChecked] = useState(false)
    const [enabled, setEnabled] = useState(false)
    const [ddisabled, setDdisabled] = useState(false)

    const closeModal = () => {
        setChecked(false)
        setEnabled(false)
        setDdisabled(false)
        close();
    }

    useEffect(() => {
        setChecked(rest)
        setEnabled(enabledVal)
        setDdisabled(ddisabledVal)
        if(rest || enabledVal || ddisabledVal) {
            setDisabled(true)
        }
    }, [rest, visible, enabledVal, ddisabledVal])

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

    const handleEnabled = (e) => {
        setEnabled(e.target.checked)
        if(e.target.checked) {
            setDdisabled(false)
            setStartVal(0)
            setEndVal(0)
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    } 

    const handleDdisabled = (e) => {
        setDdisabled(e.target.checked)
        if(e.target.checked) {
            setEnabled(false)
            setStartVal(0)
            setEndVal(0)
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const handleSave = () => {
        if(!plate) {
            if(startVal != 0 && endVal != 0) {
                const val = {
                    name: name,
                    values: {
                        start: startVal,
                        end: endVal
                    },
                    rest: checked ? 'Выходной' : ''
                }
                save(editIndex, val);
            } else {
                const val = {
                    name: name,
                    values: {
                        start: startVal,
                        end: endVal
                    },
                    rest: 'Выходной'
                }
                save(editIndex, val);
            }
            
            close() 
        } else {
            if(startVal != 0 && endVal != 0) {
                const val = {
                    name: name,
                    values: {
                        start: startVal,
                        end: endVal
                    },
                    enabled: '',
                    disabled: ''
                }
                save(editIndex, val);
            } else {
                const val = {
                    name: name,
                    values: {
                        start: startVal,
                        end: endVal
                    },
                    enabled: enabled ? 'Весь день' : '',
                    disabled: ddisabled ? 'Выключено' : ''
                }
                save(editIndex, val);
            }
            
            close() 
        }
        
    }





    return (
        <Modal className='Modal' open={visible} onCancel={closeModal}>
            
            <h2 className="Modal__head">Выбрать время</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <div className={"Modal__form_time" + (disabled ? ' disabled ' : '')}>
                        <TimePicker disabled={disabled}  hourPlaceholder='00' minutePlaceholder='00' className={"Modal__form_time_item"}   disableClock format='HH:mm' onChange={setStartVal} value={startVal} />
                        <span className='Modal__form_time_space'>-</span>
                        <TimePicker disabled={disabled} hourPlaceholder='00' minutePlaceholder='00' className={"Modal__form_time_item"}  disableClock format='HH:mm' onChange={setEndVal} value={endVal} />
                    </div>
                </div>
               
                
                {
                    plate ? (
                        <>
                            <div className="Modal__form_row">
                                <Checkbox checked={enabled} onChange={handleEnabled} id={'dayAll'} text={'Весь день'}/>
                            </div>
                            <div className="Modal__form_row">
                                <Checkbox checked={ddisabled} onChange={handleDdisabled} id={'dayOff'} text={'Выключено'}/>
                            </div>
                        </>
                    ) : (
                        <div className="Modal__form_row">
                            <Checkbox checked={checked} onChange={handleWeekend} id={'weekend'} text={'Выходной'}/>
                        </div>
                    )
                }
                <div className="Modal__form_action" style={{marginTop: 50}}>
                    <Button 
                        onClick={handleSave} 
                        text={'Сохранить'} 
                        before={<SaveIcon size={20} color={'#fff'}/>} 
                        justify={'flex-start'}/>
                </div>
            </div>
        </Modal>
    )
}

export default EditTime;
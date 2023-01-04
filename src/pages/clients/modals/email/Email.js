
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useState } from 'react';


const Email = ({visible, close, load, onSave}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const closeHandle = () => {
        close();
    }

    const handleSave = () => {
        onSave({
            Title: title,
            Body: body 
        })
    }


    return (
        <Modal className='Modal' width={600} open={visible} onCancel={closeHandle}>
            <h2 className="Modal__head">Отправить E-mail выбранным пользователям</h2>
            <div className="Modal__form">
                <div className="Modal__form_row">
                    <Input 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        maskType={String}
                        shadow
                        placeholder={'Заголовок письма'}/>
                </div>
                <div className="Modal__form_row">
                    <Input
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        maskType={String}
                        shadow
                        placeholder={'Тело письма'}/>
                </div>
                <div className="Modal__form_action">
                    <Button 
                        disabled={!title || !body}
                        load={load}
                        onClick={handleSave}
                        text={'Отправить E-mail'}/>
                </div>
            </div>
        </Modal>
    )
}

export default Email;
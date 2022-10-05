import './Settings.scss';
import Checkbox from '../../../../components/Checkbox/Checkbox';
import Pl from '../../../../components/Pl/Pl';
import { useState } from 'react';
const Settings = () => {
    const [checked, setChecked] = useState(false);

    const handleCheck = (e) => {
        if(e.target.checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }

    return (
        <div className="Settings panel">
            <h3 className="panel-label">
                Настройки
            </h3>
            <div className="Settings__body">
                <Checkbox onChange={handleCheck} shadow={true} text={'Показывать клиентам сториз при старте приложения'} id={'showStorie'}/>
                {
                    checked ? (
                        <div className="Settings__body_selects">
                            <div className="Settings__body_selects_pl">
                                Перетяните сториз в это поле чтобы выбрать его
                            </div>
                        </div>
                    ) : null
                }
                
            </div>
        </div>
    )
}

export default Settings;
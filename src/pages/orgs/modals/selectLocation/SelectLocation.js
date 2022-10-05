import './SelectLocation.scss';
import {  Modal } from 'antd';
import Input from '../../../../components/Input/Input';
import {Row, Col} from 'antd';
import Pl from '../../../../components/Pl/Pl';
import Button from '../../../../components/Button/Button';
import {BsTrash} from 'react-icons/bs';
import { useEffect, useRef, useState } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import brandImg from '../../../../assets/img/org-brand.png';

const MapComp = () => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    useEffect(() => {
        if (ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {center: {lat: 0, lng: 0}, zoom: 8} ));
        }
      }, [ref, map]);

    return (
        <div ref={ref} style={{height: '100%', width: '100%'}}/>
    )
}



const SelectLocation = ({visible, close}) => {
    const [selected, setSelected] = useState('');


    const hideModal = () => {
        close();
        
    }


    return (
        <Modal width={1220} className='Modal' open={visible} onCancel={hideModal}>
            <div className="Modal__head">Выбрать местоположение</div>
            <form className="Modal__form">
                <div className="Modal__form_row">
                    <div className="Modal__form_map">
                        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> 
                            <MapComp/>
                        </Wrapper>
                    </div>
                    
                </div>
                {
                    selected ? (
                       <div className="Modal__form_action" style={{marginTop: 30}}>
                            <Button type={'button'}  text={'Сохранить'} before={<BsTrash/>} justify={'flex-start'}/>
                       </div> 
                    ) : null
                }
            </form>
        </Modal>
    )
}

export default SelectLocation;
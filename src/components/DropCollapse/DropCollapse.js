import './DropCollapse.scss';
import { Collapse } from 'antd';

import { useState, useRef, useCallback, useEffect } from 'react';
import {BsChevronCompactDown} from 'react-icons/bs';
import Button from '../Button/Button';
import {BsTrash} from 'react-icons/bs';
import Checkbox from '../Checkbox/Checkbox';
const {Panel} = Collapse;


const DropCollapse = ({
    label,
    list,
    value,
    selectItem,
    afterIcon,
    beforeIcon,
    checkbox,
    styles,
    del,
    index
    
}) => {
    const [listActive, setListActive] = useState(false);
    const selectList = useRef(null);
    const [listHeight, setListHeight] = useState(0);


    const handleList = () => {
        setListActive(!listActive)
    }
    
    const handleSelectItem = (value, index) => {
        selectItem(value, index)
    }

    useEffect(() => {
        
        if(selectList.current) {
            if(listActive) {
                setListHeight(selectList.current.scrollHeight) 
            } else {
                setListHeight(0)
            }
        }
        
    }, [listActive, selectList])
    


    return (
        <>
            <div style={styles} className={"DropCollapse" + (listActive ? ' active ' : '')}>
                <div onClick={handleList} className={"DropCollapse__head"}>
                    {
                        label ? (
                            <div className="DropCollapse__head_label">{label}</div>
                        ) : null
                    }
                    <div className="DropCollapse__head_value">
                        {beforeIcon ? (
                            <div className="DropCollapse__head_value_icon"><BsChevronCompactDown/></div>
                        ): null}
                        <span className="DropCollapse__head_value_el">{value}</span>
                        {afterIcon ? (
                            <div className="DropCollapse__head_value_icon"><BsChevronCompactDown/></div>
                        ) : null}
                    </div>
                    
                </div>
                <div style={{height:`${listHeight}px`}} ref={selectList} className="DropCollapse__list" >
                    <div className="DropCollapse__list_in">
                        {
                            list && list.length > 0 ? (
                                list.map((item, i) => {
                                    if(value == item.value) {
                                        return (
                                            <div onClick={() => handleSelectItem(item.value, index)} className="DropCollapse__item active" key={i}>{item.value}</div>
                                        )
                                    } else {
                                        return (
                                            <div onClick={() => handleSelectItem(item.value, index)} className="DropCollapse__item" key={i}>{item.value}</div>
                                        )
                                    }
                                    
                                })
                            ) : null
                        }
                    </div>
                    {
                        del ? (
                            <div className="DropCollapse__list_ex">
                                <Button onClick={() => del(index)} styles={{width: '100%'}} before={<BsTrash/>} variant={'danger'} text={'Удалить способ оплаты'}/>
                            </div>
                        ) : null
                    }
                   
                </div>
            </div>
           
        </>
        
    )
}

export default DropCollapse;
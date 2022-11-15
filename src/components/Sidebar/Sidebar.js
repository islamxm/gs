import './Sidebar.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import catService from '../../services/catService';
import { useEffect, useState, useRef } from 'react';
import SidebarItem from './components/SidebarItem/SidebarItem';
import {FiCodesandbox, FiHome} from 'react-icons/fi';
import {BeatLoader} from 'react-spinners';
import {AiOutlineRollback} from 'react-icons/ai';
import {motion} from 'framer-motion';
import {VscListOrdered} from 'react-icons/vsc';
import CatalogIcon from '../../icons/CatalogIcon/CatalogIcon';
import {CgTag} from 'react-icons/cg';
import StatIcon from '../../icons/StatIcon/StatIcon';
import OrderIcon from '../../icons/OrderIcon/OrderIcon';
import {FiUsers, FiSettings} from 'react-icons/fi';
import SettingsIcon from '../../icons/SettingsIcon/SettingsIcon';
import StatisticIcon from '../../icons/StatisticIcon/StatisticIcon';
import BasketIcon from '../../icons/BasketIcon/BasketIcon';
import IntegrIcon from '../../icons/IntegrIcon/IntegrIcon';
import TrashIcon from '../../icons/TrashIcon/TrashIcon';
import {BsBag} from 'react-icons/bs';
import {catalogUpdate, handleSidebarOpen} from '../../store/actions'

const cs = new catService();

const Sidebar = () => {
    const {token, catalog} = useSelector(state => state)
    const [catLoad, setCatLoad] = useState(false)
    const [isHide, setIsHide] = useState(true)
    const dispatch = useDispatch();


    useEffect(() => {
        setCatLoad(true)
        if(token) {
            cs.getCats(token, {OrganisationID: 0}).then(res => {
                // setCats(res)
                dispatch(catalogUpdate(res))
            }).finally(_ => {
                setCatLoad(false)
            })
        }
    }, [token])



    const toggleSidebar = () => {
        setIsHide(!isHide)
    }

    useEffect(() => {
        if(isHide) {
            dispatch(handleSidebarOpen(false))
        } else {
            dispatch(handleSidebarOpen(true))
        }
    }, [isHide])

    return (
        <>
            <div className={"Sidebar-pl" + (isHide ? ' hide ' : '')}></div>
            <motion.div 
            initial={{translateX: '-100%'}}
            animate={{translateX: 0}}
            transition={{duration: 0.5}}
            exit={{translateX: '-100%'}}

            className={"Sidebar gs-scroll" + (isHide ? ' hide ' : '')}>
            <div className="Sidebar__head">
                <div className="Sidebar__head_label">
                МЕНЮ
                </div>
                
                <div className="Sidebar__head_icon" onClick={toggleSidebar}>
                    <AiOutlineRollback/>
                </div>
            </div>
            <div className="Sidebar__list">
                <SidebarItem
                    labelHide={isHide}
                    name={'Организации'}
                    link={'/organizations'}
                    icon={<FiHome/>}
                />
                <SidebarItem
                    labelHide={isHide}
                    toggleSidebar={setIsHide}
                    name={'Каталог'}
                    link={'/catalog'}
                    isSubmenu={catalog?.length > 0 ? true : false}
                    icon={<CatalogIcon size={22}/>}
                >   
                    {
                        catLoad ? (
                            <div className="SidebarItem__load">
                                <BeatLoader color='var(--violet)'/>
                            </div>
                            
                        ) : (
                            catalog && catalog.length > 0 ? (
                                catalog.map((item, index) => (
                                    <SidebarItem
                                        key={index}
                                        labelHide={isHide}
                                        icon={<FiCodesandbox/>}
                                        name={item.Name}
                                        link={`/catalog/${item.ID}`}
                                        />
                                ))
                            ) : null
                        )
                    }

                </SidebarItem>
                <SidebarItem
                    labelHide={isHide}
                    name={'Сториз'}
                    link={'/stories'}
                    icon={<CgTag style={{transform: 'rotate(-45deg)'}}/>}
                    />
                <SidebarItem
                    labelHide={isHide}
                    name={'Аналитика'}
                    isSubmenu={true}
                    toggleSidebar={setIsHide}
                    icon={<StatIcon size={22}/>}
                    >
                        <SidebarItem labelHide={isHide} name={'Клиенты'} link={'/clients'} icon={<FiUsers/>}/>
                        <SidebarItem labelHide={isHide} name={'Заказы'} link={'/orders'} icon={<OrderIcon size={22}/>}/>
                        <SidebarItem labelHide={isHide} name={'Статистика'} link={'/statistic'} icon={<StatisticIcon size={22}/>}/>
                </SidebarItem>
                <SidebarItem
                    labelHide={isHide}
                    name={'Настройки'}
                    toggleSidebar={setIsHide}
                    isSubmenu={true}
                    icon={<SettingsIcon size={22}/>}
                    >
                        <SidebarItem labelHide={isHide} name={'Корзина'} link={'/basket'} icon={<BsBag/>}/>
                        <SidebarItem labelHide={isHide} name={'Интеграции'} link={'/integr'} icon={<IntegrIcon size={22}/>}/>
                        <SidebarItem labelHide={isHide} name={'Все настройки'} link={'/allsettings'} icon={<FiSettings/>}/>
                        <SidebarItem labelHide={isHide} name={'Удаленные объекты'} link={'/trash'} icon={<TrashIcon size={22}/>}/>
                </SidebarItem>
            </div>
        </motion.div>
        </>
        
    )
}

export default Sidebar;
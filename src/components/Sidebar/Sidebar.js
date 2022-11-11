import './Sidebar.scss';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import catService from '../../services/catService';
import { useEffect, useState, useRef } from 'react';
import SidebarItem from './components/SidebarItem/SidebarItem';
import {FiCodesandbox} from 'react-icons/fi';
import {BeatLoader} from 'react-spinners';
import {AiOutlineRollback} from 'react-icons/ai';
import {motion} from 'framer-motion';
const cs = new catService();

const Sidebar = ({updateCat}) => {
    const {token} = useSelector(state => state)
    const [cats, setCats] = useState([])
    const [catLoad, setCatLoad] = useState(false)


    const [isHide, setIsHide] = useState(false)

    useEffect(() => {
        setCatLoad(true)
        if(token) {
            cs.getCats(token, {OrganisationID: 0}).then(res => {
                setCats(res)
            }).finally(_ => {
                setCatLoad(false)
            })
            
        }
    }, [token])





    const toggleSidebar = () => {
        setIsHide(!isHide)
    }

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
                    icon={<FiCodesandbox/>}
                />
                <SidebarItem
                    labelHide={isHide}
                    toggleSidebar={setIsHide}
                    name={'Каталог'}
                    link={'/catalog'}
                    isSubmenu={true}
                    icon={<FiCodesandbox/>}
                >   
                    {
                        catLoad ? (
                            <div className="SidebarItem__load">
                                <BeatLoader color='var(--violet)'/>
                            </div>
                            
                        ) : (
                            cats && cats.length > 0 ? (
                                cats.map((item, index) => (
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
                    icon={<FiCodesandbox/>}
                    />
                <SidebarItem
                    labelHide={isHide}
                    name={'Аналитика'}
                    isSubmenu={true}
                    toggleSidebar={setIsHide}
                    icon={<FiCodesandbox/>}
                    >
                        <SidebarItem labelHide={isHide} name={'Клиенты'} link={'/clients'} icon={<FiCodesandbox/>}/>
                        <SidebarItem labelHide={isHide} name={'Заказы'} link={'/orders'} icon={<FiCodesandbox/>}/>
                        <SidebarItem labelHide={isHide} name={'Статистика'} link={'/statistic'} icon={<FiCodesandbox/>}/>
                </SidebarItem>
                <SidebarItem
                    labelHide={isHide}
                    name={'Настройки'}
                    toggleSidebar={setIsHide}
                    isSubmenu={true}
                    icon={<FiCodesandbox/>}
                    >
                        <SidebarItem labelHide={isHide} name={'Корзина'} link={'/basket'} icon={<FiCodesandbox/>}/>
                        <SidebarItem labelHide={isHide} name={'Интеграции'} link={'/integr'} icon={<FiCodesandbox/>}/>
                        <SidebarItem labelHide={isHide} name={'Удаленные объекты'} link={'/trash'} icon={<FiCodesandbox/>}/>
                </SidebarItem>
            </div>
        </motion.div>
        </>
        
    )
}

export default Sidebar;
import './UploadKml.scss';
import {BsDownload} from 'react-icons/bs';
import kmlParser from 'js-kml-parser';
import orgService from '../../../../../services/orgService';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import SelectKmlPol from '../../modals/SelectKmlPol/SelectKmlPol';
import { useEffect } from 'react';
import { useRef } from 'react';
const os = new orgService();

const UploadKml = ({getKml, updatePolList}) => {
    const {token} = useSelector(state => state)
    const {orgId} = useParams()
    const [selectKmlPolModal, setSelectKmlPolModal] = useState(false)
    const [ll, setLl] = useState(null)
    const file = useRef()

    const openSelectKmlPolModal = () => {
        setSelectKmlPolModal(true)
    }
    const closeSelectKmlPolModal = () => {
        setLl(null)
        setSelectKmlPolModal(false)
        resetFile()
    }

    const resetFile = () => {
        file.current.value = ''
    }

    const handleChange = (e) => {
        fetch(URL.createObjectURL(e.target.files[0]), {
            method: 'GET',
        }).then(res => res.text()).then(data => {
            const parsedData = kmlParser.toGeoJson(data)
            
            setLl(parsedData.features.filter(item => item.geometry.coordinates.length != 3).map((item, index) => {
                return {
                    ...item,
                    id: index
                }
            }))
            openSelectKmlPolModal()
        })
    }

    return (
        <div className="UploadKml">
            <SelectKmlPol
                resetFile={resetFile}
                updatePolList={updatePolList}
                visible={selectKmlPolModal}
                close={closeSelectKmlPolModal}
                list={ll}
                />
            <input ref={file} onChange={handleChange} type="file" accept='.kml' id='UploadKml'/>
            <label htmlFor="UploadKml" className="UploadKml__label">
                <div className="UploadKml__label_text def-label">Загрузить KML-файл</div>
                <div className="UploadKml__label_icon">
                    <BsDownload/>
                </div>
            </label>
        </div>
    )
}

export default UploadKml;
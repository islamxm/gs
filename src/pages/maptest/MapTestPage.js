
import Button from '../../components/Button/Button';
import MapPolygon from '../../components/MapPolygon/MapPolygon';
import MapMarker from '../../components/MapMarker/MapMarker';
import { useSelector } from 'react-redux';
import orgService from '../../services/orgService';

const os = new orgService()

const MapTestPage = () => {
    const {token} = useSelector(state => state)

    const addOrg = () => {
        os.addOrg(token).then(res => {
            console.log(res)
        })
    }

    return (
        <div className="page">
            <main className="Main">
                <div className="pageBody">
                    <div className="pageBody-content">

                        <h1 style={{fontWeight: 700, fontSize: 70, lineHeight: '100%', marginBottom: 25}}>Polygon</h1>

                        {/* тут будет карта */}
                        <div style={{height: 500}}>
                            {/* <MapPolygon center={{lat: 55.7522200,lng: 37.6155600}}/> */}
                        </div>

                        {/* кнопки для вызова модалок */}
                        <div style={{padding: '30px 0'}}>
                            <Button type={'button'} onClick={addOrg} text={'Create org'}/> 
                        </div>

                    </div>
                </div>
            </main>
    
        </div>
    )    
}

export default MapTestPage;
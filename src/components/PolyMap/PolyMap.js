import { useState, useEffect, useRef } from "react";

const currentLocSuccess = (e, setCurrentLoc) => {
    console.log(e.coords)
    setCurrentLoc({lat: e.coords.latitude, lng: e.coords.longitude})
}

const currentLocError = (e, setCurrentLoc) => {
    setCurrentLoc({lat: 53.12345678, lng: 43.12345678})
}


const PolyMap = ({setSelected, coords, readOnly}) => {
    const ref = useRef(null);
    const [map, setMap] = useState();
    const [currentLoc, setCurrentLoc] = useState(null)
    const [poly, setPoly] = useState()
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((pos) => currentLocSuccess(pos, setCurrentLoc), (err) => currentLocError(err, setCurrentLoc))
    }, [])



    useEffect(() => {
        if (ref.current && !map && !poly && !coords && currentLoc) {
            setMap(new window.google.maps.Map(ref.current, {center: {...currentLoc}, zoom: 8} ));   
            setPoly(new window.google.maps.Polygon())
        }
        if(ref.current && !map && !poly && coords) {
            setMap(new window.google.maps.Map(ref.current, {center: {...coords}, zoom: 8} ));   
            
        }

      }, [ref, map, coords, currentLoc]);
    
    useEffect(() => {
        if(map) {
            map.setOptions({center: {...coords}, zoom: 8})
            if(setSelected) {
                map.addListener('click', (e) => {
                    setSelected([e.latLng.lat(), e.latLng.lng()])
                    
                })
            }
            
        }
    }, [map, coords])

    return (
        <div ref={ref} style={{height: '100%', width: '100%', pointerEvents: (readOnly ? 'none' : 'all')}}>
        </div>
    )
}

export default PolyMap;
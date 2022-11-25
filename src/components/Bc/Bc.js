import './Bc.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';

const Bc = ({parent}) => {
    const params = useParams()
    const [links, setLinks] = useState([])

    useEffect(() => {
        console.log(params)
        
    }, [params, parent])




    return (
        <div className="Bs">
            {
                links?.map((item,index) => (
                    <div className="Bc__item" key={index}>
                        
                    </div>
                ))
            }
        </div>
    )
}

export default Bc;
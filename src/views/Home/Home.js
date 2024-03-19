import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { ButtonStore } from '../../Components/ButtonSotre/ButtonStore';
import { useNavigate} from 'react-router-dom';
import { Sniper } from '../../Components/Loadings/Sniper';

export const Home = () => {
    const [stores, setStores] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        getStores();
    }, []);

    const getStores = async () => {    
        const response = await api.getStores();
        setStores(response.data.data);   
    }

    const handleSectors = (id) => {
        if(id){
            navigate(`/sector/${id}`)
        }
    }

    return (
        <div className='container'>
            {isLoading && <Sniper isLoading={isLoading}/>}
            {!isLoading &&
                <div className='row mt-5 d-flex justify-content-center'>
                    {stores.map((item, index) => (
                        <div key={index} className='col-sm-12 col-md-4 col-lg-4 col-12 d-grid mb-2 mt-3'>
                            <ButtonStore text={item.name} onClick={() => handleSectors(item.id)} disabled={isLoading} />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

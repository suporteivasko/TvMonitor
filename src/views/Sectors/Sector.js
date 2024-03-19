import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { useParams } from 'react-router-dom';
import { ButtonSector } from '../../Components/ButtonSectors/ButtonSector';
import { useNavigate } from 'react-router-dom';

import { Sniper } from '../../Components/Loadings/Sniper';
import { BtnReturn } from '../../Components/Buttons/BtnReturn';


export const Sector = () => {
    const [sectors, setSectors] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        getSectors(id);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
        
    }, [id]);

    const getSectors= async (id) => {    
        const response = await api.getSectors(id);
        //setLoading(true);

        if(response.data.data){
            setSectors(response.data.data);  
        } 
        /*setTimeout(() => {
            setLoading(false);
        }, 2000);*/
       
    }

    const handleContent = (sector_id) => {
        
        if((parseInt(sector_id) === 1) || (parseInt(sector_id) === 2)){
                       
            navigate(`/content/${id}/${sector_id}`);
           
        }else{
            navigate(`/streaming/${id}/${sector_id}`);
        }
       


    }

    return (
        <div className='container'>
            
            { isLoading && <Sniper isLoading={isLoading}/>}
            {!isLoading &&
                <>
                    <BtnReturn rote={'/'}/> 
                    <div className='row mt-5 d-flex justify-content-center'>
                        {sectors.map((item, index) => (
                        <div key={index} className='col-sm-12 col-md-4 col-lg-4 col-12 d-grid mb-2 mt-3'>
                            <ButtonSector text={item.name} onClick={() => handleContent(item.id)} />
                        </div>
                        ))}
                    </div>
                </>
            }
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './style.css'
import CarouselProduct from '../../Components/Carousel/CarouselProduct';
import {Sniper} from '../../Components/Loadings/Sniper';

export const Content = () => {
    const {id, sector_id } = useParams();
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {setLoading(false)},2000);
    }, [])

    return (
        <>
            
                <div className='content'>
                    <div className=''>
                        {parseInt(sector_id) === 1 &&
                            <img src='./images/acougue.png' style={{ width: '100%', height: '120px' }} />
                        }  
                        {parseInt(sector_id) === 2 &&
                            <img src='./images/padaria.png' style={{ width: '100%', height: '120px' }} />
                        }  
                    </div>     
                    {isLoading && <Sniper isLoading={isLoading}/>}
                    <div className=''>
                        <div className=''>                                            
                            <CarouselProduct empresa={id} sector={sector_id}/>                               
                        </div>
                    </div>
                </div>
          
        </>
    );
}

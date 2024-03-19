import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

export const BtnReturn = ({ rote }) => {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(rote);
    };

    return (
        <>
            <div className='row'>
                <div className='col-12 d-flex justify-content-end'>
                    <button className='btn text-light' onClick={handleRedirect}>
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" />
                    </button>
                </div>
            </div>
        </>
    );
};

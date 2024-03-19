import { RingLoader } from 'react-spinners';
export const Sniper = ({isLoading}) => {
    return(
        <>
             <RingLoader
                color="#e96d08"
                loading={isLoading}
                size={150}
                style={{
                position: 'fixed',
                top: '30%',
                left: '45%',
                transform: 'translate(-50%, -50%)',
                zIndex: 9999
                }}
            />
        </>
    );
}
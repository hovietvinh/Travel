import {  useLocation } from 'react-router-dom';

import FormAddPlace from '../../components/FormAddPlace';
import ShowPlace from './ShowPlace';
function Place() {
    const location = useLocation()
    const action = location.pathname.split("/")[3]
    

    return (
        <>  

            {action  && (
                <>
                    <FormAddPlace/>
                </>
            )}

            {!action && (
                <>
                    <ShowPlace/>
                </>
            )}



        </>
    );
}

export default Place;
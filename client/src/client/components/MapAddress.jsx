import React from 'react';
import { FaMapMarkerAlt } from "react-icons/fa";

function MapAddress({data}) {
    return (
        <>
            <a className='underline flex justify-center sm:block font-semibold my-3 items-center flex gap-1' href={`https://www.google.com/maps/place/${data.address}`} target="_blank">
                <FaMapMarkerAlt />

                {data.address}
            </a>
        </>
    );
}

export default MapAddress;
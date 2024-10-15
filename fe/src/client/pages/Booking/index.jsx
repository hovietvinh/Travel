
import { useLocation } from "react-router-dom";
import Booking from "./Booking";
import BookingId from "./BookingId";

function BookingHome() {
   
    const location = useLocation()
    const action = location.pathname.split("/")[3]
    
    return (
        <>
            {action  && (
                <>
                    <BookingId/>
                </>
            )}

            {!action && (
                <>
                    <Booking/>
                </>
            )}

        </>
    );
}

export default BookingHome;
module.exports.calculateDateDifference = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    // Calculate the difference in milliseconds
    const timeDifference = checkOutDate - checkInDate;

    // Convert milliseconds to days
    const dayDifference = timeDifference / (1000 * 60 * 60 * 24);

    return dayDifference;
};
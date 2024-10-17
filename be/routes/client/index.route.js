const userRoutes = require("./user.route")
const placeRoutes = require("./place.route")
const userPlaceRoutes = require("./user-place.route")
const bookingRoutes = require("./booking.route")

module.exports = (app)=>{
   app.use("/be/api/users",userRoutes)
   app.use("/be/api/users-places",userPlaceRoutes)
   app.use("/be/api/places",placeRoutes)
   app.use("/be/api/bookings",bookingRoutes)
}
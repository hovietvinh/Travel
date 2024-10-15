const userRoutes = require("./user.route")
const placeRoutes = require("./place.route")
const userPlaceRoutes = require("./user-place.route")
const bookingRoutes = require("./booking.route")

module.exports = (app)=>{
   app.use("/api/users",userRoutes)
   app.use("/api/users-places",userPlaceRoutes)
   app.use("/api/places",placeRoutes)
   app.use("/api/bookings",bookingRoutes)
}
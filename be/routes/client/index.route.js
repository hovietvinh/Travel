const userRoutes = require("./user.route")
const placeRoutes = require("./place.route")

module.exports = (app)=>{
   app.use("/api/users",userRoutes)
   app.use("/api/places",placeRoutes)
}
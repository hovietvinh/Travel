const express = require("express")
const app = express()
const cors = require("cors")
const env = require("dotenv")
const clientRoutes = require("./routes/client/index.route")
const cookieParser = require("cookie-parser")
env.config()

app.use(express.json() )

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));
app.use(cookieParser());

const config = require("./config/database.js")

config.connect()

clientRoutes(app)

const port = process.env.PORT

app.listen(port,()=>{
    console.log("port", port);
})
const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const app = express()

connectToMongo()
const port = 5000
app.use(cors())
app.use(express.json())
app.use("/api/auth",require('./routes/auth'))
app.use("/api/user",require('./routes/user'))
app.use("/api/post",require('./routes/posts'))
app.use("/api/follow",require('./routes/follow'))
app.listen(port)
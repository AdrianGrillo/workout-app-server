require('./models/User')
require('./models/Track')
const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(express.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://Admin:passwordpassword@track-server.x49zw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUri)

mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
})

// If requireAuth middleware next() is invoked, allow access to root route
app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3005, () => {
    console.log('Listening on port 3005')
}) 
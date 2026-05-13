const express = require('express')
const connectDB = require('./config/config')
const cors = require('cors')

const eventRoute = require('./route/eventroute')
const adminRoute = require('./route/adminroute')
const memberRoute = require('./route/memberroute')
const anouncementRoute = require('./route/anouncementroute')
const newsRoute = require('./route/newsroute')
const administratifRoute = require('./route/administrativeroute')

const app = express()
const port = 5000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - Body:`, req.body)
    next()
})

connectDB()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Routes
app.use('/api/admin', adminRoute)

//pengumuman dan berita terkini
app.use('/api/events', eventRoute)

//route for input member
app.use('/api/inputmember', memberRoute)

//route for administratif
app.use('/api/administratif', administratifRoute)

//route dasboard
app.use('/api/anouncement', anouncementRoute)

//route news
app.use('/api/news', newsRoute)

app.get('/', (req, res) => {
    res.send(`server is running on port ${port}, mongoDB is connected`)
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})



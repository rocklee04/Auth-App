const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyparser = require('body-parser')
const router = require('./Routes/user.route')
const productRouter = require('./Routes/product.route')

const PORT = process.env.PORT || 4000
dotenv.config()

const app = express();

mongoose.connect(process.env.mongoURL)
.then(() => {
    console.log("Connected to DB")
}).catch(error => {
    console.error('Error connecting to DB')
})

app.use(cors);
app.use(bodyparser.json());

app.use('/users', router)
app.use('/products', productRouter)

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})
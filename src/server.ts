import express, { Request, Response, Application } from 'express'
import { connect } from 'mongoose';

const app: Application = express()
import cors from 'cors'
const router = require('./Routes/order')

app.use(express.json())
app.use(cors())
app.use(router)

connect('mongodb://127.0.0.1:27017/order_db')
    .then(() => {
        console.log("Database connected successfully");
    })
    .catch((err) => console.log(err));

app.listen(8000, () => {
    console.log("Server running at 8000");
})
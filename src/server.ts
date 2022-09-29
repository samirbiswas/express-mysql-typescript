import express, { Request, Response, Application } from 'express'
const app: Application = express()
import cors from 'cors'
const router = require('./Routes')

app.use(express.json())
app.use(cors())
app.use(router)

app.listen(8000, () => {
    console.log("Server running at 8000");
})
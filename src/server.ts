import express, { Application, Request } from 'express';
require('dotenv').config();
import cors from 'cors';
import router from './Routes/auth.route';

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use("/auth", router)

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running at ${process.env.PORT || 5000}`);
})
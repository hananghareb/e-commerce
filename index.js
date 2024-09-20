import express from 'express'
import { dbconnection } from './Database/dbconnection.js'
import path from 'path'
import { bootstrap } from './src/modules/bootstrap.js'
import { globalerror } from './src/middleware/globalError.js'
import { AppError } from './src/utils/appError.js'
import dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'

const app = express()
const port = process.env.port || 3000

console.log(process.env.DB_URL);


app.use(cors())
app.use(express.json())
app.use('/uploads',express.static('uploads'))

dbconnection()

bootstrap(app)
  
app.use('*',(req,res,next)=>{
    next(new AppError(`route not found , ${req.originalUrl}`,404))
})
app.use(globalerror)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.js'
import registerRoutes from './routes/register.routes.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(userRoutes)
app.use(registerRoutes)

app.listen(5000, console.log("Running in port 5000"))
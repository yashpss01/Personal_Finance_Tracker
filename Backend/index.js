const express = require('express')
const app = express()

const {PrismaClient} = require('./generated/prisma')
const prisma = new PrismaClient()

const cors = require('cors')
app.use(cors())

require('dotenv').config()

app.use(express.json())

const PORT = 3000





app.listen(PORT,()=>{
    console.log("Server is runnig")
})
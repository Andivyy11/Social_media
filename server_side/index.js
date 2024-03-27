const express=require('express')  // import express
const app=express()    //create an instance of express

// use() is used to use routes and other web frameworks in app
const mongoose=require('mongoose')
const morgan=require('morgan')
const helmet=require('helmet')
const dotenv =require('dotenv')
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

mongoose.connect("mongodb://localhost:27017/socialDB" , { useNewUrlParser:true }) 

//importing routes
const usersRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const convRoute = require('./routes/conversation')
const postRoute = require('./routes/post')
const mssgRoute = require('./routes/message')

app.use('/api/user' , usersRoute)
app.use('/api/auth', authRoute)
app.use('/api/post' , postRoute)
app.use('/api/message' , mssgRoute)
app.use('/api/conversation' , convRoute)

app.listen(8000 ,()=>{
    console.log('server in running...')
})

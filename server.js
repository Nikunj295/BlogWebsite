const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/articles')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')

const app = express()
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI,{useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },()=>{
    console.log("DataBase connected !")
})

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get("/", async (req,res)=>{
    const articles = await Article.find().sort({
        createdAt:'desc'
    })
    res.render('articles/index', { articles:articles })
})


app.use('/articles',articleRouter)

app.listen(3000,()=>{
    console.log("Server Running on "+3000)
})
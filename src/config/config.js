// imports
const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')
const passport = require('passport')

// config
process.noDeprecation = true
    // session
    app.use(session({
        secret:'comprascomMoni',
        resave:true,
        saveUninitialized:true,
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    // middleware
    app.use((req,res,next)=>{
        res.locals.error_msg = req.flash('error_msg')
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
        next()
    })
    // view engine
    app.engine('handlebars', handlebars.engine({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')
    // json
    app.use(express.urlencoded({extended:true}))
    app.use(express.json())
    // public
    app.use(express.static(path.join(__dirname,'../public')))
    app.set('views', 'src/views')


module.exports = app
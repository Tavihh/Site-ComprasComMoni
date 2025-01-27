// immports
const app = require('./config/config')
const admin = require('./routes/admin')
const Produto = require('./models/Produto')
const { Op } = require('sequelize')
const passport = require('./config/auth')

process.noDeprecation = true
// rotas
app.use('/admin', (req,res,next)=>{
    res.locals.layout = 'admin';
    next()
},admin)

app.get('/', (req, res)=>{
    Produto.findAll({order:[['createdAt','DESC']]}).then((produto)=>{
        produto = produto.map((item)=>{
            item = item.toJSON()
            const [precoInteiro, precoDecimal] = item.preco.split('.')
            item.precoInteiro = precoInteiro
            item.precoDecimal = precoDecimal
            return item
        })
        res.render('home/index',{produto})
    }).catch((err)=>{
        res.status(404).send('Ocorreu um erro ao carregar os produtos, tente novamente')
    })
})

app.post('/pesquisa', (req,res)=>{
    Produto.findAll({where:{nome:{[Op.like]: `%${req.body.psq}%`}}}).then((produto)=>{
        produto = produto.map((item)=>{
            item = item.toJSON()
            const [precoInteiro, precoDecimal] = item.preco.split('.')
            item.precoInteiro = precoInteiro
            item.precoDecimal = precoDecimal
            return item
        })
        res.render('home/index',{produto})
    }).catch((err)=>{
        res.status(404).send('Ocorreu um erro ao carregar os produtos, tente novamente')
    })
})

app.get('/login', (req, res)=>{
    if(req.user){
        res.redirect('/admin')
    } else {
        res.render('home/login')
    }
})

app.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next)

})

// outros
const PORT = 9090
app.listen(PORT,()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})
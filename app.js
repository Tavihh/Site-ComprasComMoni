// immports
const app = require('./config/config')
const admin = require('./routes/admin')
const Produto = require('./models/Produto')
const { Op } = require('sequelize')

process.noDeprecation = true
// rotas
app.use('/admin', (req,res,next)=>{
    res.locals.layout = 'admin';
    next()
},admin)

app.get('/', (req, res)=>{
    Produto.findAll().then((produto)=>{
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

// outros
const PORT = 80
app.listen(PORT,()=>{
    console.log(`Servidor rodando em: http://localhost:${PORT}`)
})
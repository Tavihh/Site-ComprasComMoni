const { Sequelize } = require('sequelize')
require('dotenv').config({path:'.env'})

// variaveis para o Banco
const host = process.env.DB_HOST
const user = process.env.DB_USER
const pass = process.env.DB_PASS
const database = process.env.DB_DATABASE

const sequelize = new Sequelize(database, user, pass,{
    host:host,
    dialect:'mysql',
    logging:false
})

sequelize.authenticate().then(()=>{
    console.log("MySQL conectado!")
}).catch((err)=>{
    console.log("MySQL falhou!, Erro:",err)
})

module.exports = sequelize
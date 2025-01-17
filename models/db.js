const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('comprascomdai','root','P@cienc1a',{
    host:'localhost',
    dialect:'mysql',
    logging:false
})

sequelize.authenticate().then(()=>{
    console.log("MySQL conectado!")
}).catch((err)=>{
    console.log("MySQL falhou!, Erro:",err)
})

module.exports = sequelize
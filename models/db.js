const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('comprascommoni','root','P@cienc1a',{
    host:'147.93.68.67',
    dialect:'mysql',
    logging:false
})

sequelize.authenticate().then(()=>{
    console.log("MySQL conectado!")
}).catch((err)=>{
    console.log("MySQL falhou!, Erro:",err)
})

module.exports = sequelize
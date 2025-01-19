const { DataTypes } = require('sequelize')
const sequelize = require('./db')

const Categoria = sequelize.define('categorias',{
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    }
    
},{freezeTableName:true})

Categoria.sync().then(()=>{
    console.log("Tabela 'Categorias' OK")
}).catch((err)=>{
    console.log("Tabela 'Categorias' Não OK, ERRO:",err)
})

module.exports = Categoria
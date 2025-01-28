const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Categoria = require('./Categoria')

const Produto = sequelize.define('produtos',{
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    preco:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    path_foto:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    link:{
        type:DataTypes.TEXT
    },
    telefone:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    
},{freezeTableName:true})

Produto.belongsTo(Categoria,{
    foreignKey: 'categoria_id',
    onUpdate: 'CASCADE',
})

Produto.sync().then(()=>{
    console.log("Tabela 'Produtos' OK")
}).catch((err)=>{
    console.log("Tabela 'Produtos' Não OK, ERRO:",err)
})

module.exports = Produto
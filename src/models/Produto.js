const { DataTypes } = require('sequelize')
const sequelize = require('./db')
const Categoria = require('./Categoria')
const User = require('./Users')

const Produto = sequelize.define('produtos',{
    nome:{
        type:DataTypes.STRING,
        allowNull:false
    },
    preco:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false
    },
    path_foto:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    link:{
        type:DataTypes.TEXT
    }
    
},{freezeTableName:true})

Produto.belongsTo(Categoria,{
    foreignKey: 'categoria_id',
    onUpdate: 'CASCADE',
})

Produto.belongsTo(User, {
    foreignKey: 'telefone',
    targetKey: 'telefone',
    onUpdate: 'CASCADE'
})

Produto.sync({alter:true}).then(()=>{
    console.log("Tabela 'Produtos' OK")
}).catch((err)=>{
    console.log("Tabela 'Produtos' Não OK, ERRO:",err)
})

module.exports = Produto
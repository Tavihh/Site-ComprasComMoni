// importações
const prompt = require('async-prompt')
const bcrypt = require('bcryptjs')
const User = require('./models/Users')

setTimeout(async ()=> {
    // Válidação de Nome
    let nome = await prompt('Nome: ')
    while (nome.length < 3) {
        console.log("Nome muito curto")
        nome = await prompt('Nome: ')
    }
    // Válidação de Sobrenome
    let sobrenome = await prompt('Sobrenome: ')
    while (sobrenome.length < 3) {
        console.log("Sobrenome muito curto")
        sobrenome = await prompt('Sobrenome: ')
    }
    // Válidação de Telefone
    let telefone = await prompt('Telefone com DDD: ')
    while (telefone.length < 11) {
        console.log("Telefone muito curto")
        telefone = await prompt('Telefone com DDD: ')
    }
    // Válidação de Email
    let email = await prompt('Email: ')
    while (!email.includes('@') || !email.includes('.com')) {
        console.log("Email inválido!")
        email = await prompt('Email: ')
    }
    let senha = await prompt('Senha: ')
    let senha2 = await prompt('Comfirme a senha: ')
    
    while(senha != senha2) {
        console.log("Senhas não são iguais")
        senha = await prompt('Senha: ')
        senha2 = await prompt('Comfirme a senha: ')
    }
    
    bcrypt.genSalt(10).then((salt)=>{
        bcrypt.hash(senha,salt).then((senha)=>{
            User.create({
                nome:nome,
                sobrenome:sobrenome,
                telefone:telefone,
                email:email,
                senha:senha
            }).then(()=>{
                console.log('Usúario criado com sucesso')
            // Tratando Erros
            }).catch((err)=>{
                console.log("Erro ao salvar a conta de um usúario no banco de dados, Erro:",err.message)
            })
        }).catch((err)=>{
            console.log('Erro ao gerar o hash da senha no bcrypt, Erro:',err.message)
        })
    }).catch((err)=>{
        console.log('Erro ao gerar o salt da senha no bcrypt, Erro:',err.message)
    })
}, 2000)

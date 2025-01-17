const router = require('express').Router()
const passport = require('../config/auth')
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
const Produto = require('../models/Produto')
const { eAdmin } = require('../helpers/eAdmin')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')
const multer = require('multer')


// config multer
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        var pathFoto = path.join(__dirname,'../public/produtos')
        cb(null,pathFoto)
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime() + file.originalname)
    }
})

const upload = multer({storage:storage})


router.get('/', eAdmin, (req,res)=>{
    // buscando os produtos
    Produto.findAll({limit:20,order:[['createdAt','desc']]}).then((produto)=>{
        produto = produto.map(item=> item.toJSON())
        res.render('admin/index', {produto})
    // tratando o erro
    }).catch((err)=>{
        req.flash('error_msg','Erro ao carregar o painel')
        res.redirect('/')
    })
})

router.post('/pesquisa', eAdmin, (req,res)=>{
    Produto.findAll({where:{nome:{[Op.like]: `%${req.body.psq}%`}},order:[['createdAt','desc']],limit:20}).then((produto)=>{
        produto = produto.map(item => item.toJSON())
        res.render('admin/index',{produto})
    }).catch((err)=>{
        res.status(404).send('Ocorreu um erro ao carregar os produtos, tente novamente')
    })
})

router.get('/editar/:id', eAdmin, (req,res)=>{
    User.findOne({where:{id:req.params.id}}).then((user)=>{
        if(user){
            res.render('admin/editarADM', {user:user.toJSON()})
        } else {
            req.flash('error_msg','Adiministrador não encontrado')
            res.redirect('/admin')
        }
    }).catch((err)=>{
        req.flash('error_msg','Não foi possivel fazer a busca no banco de dados')
        res.redirect('/admin')
    })
})

router.post('/editar/:id', eAdmin, (req,res)=>{
    User.findOne({where:{id:req.params.id}}).then((user)=>{
        if(user){
            user.update({
                nome:req.body.nome,
                sobrenome:req.body.sobrenome,
                email:req.body.email
            }).then(()=>{
                req.flash('success_msg','Administrador atualizado com sucesso!, faça login novamente')
                res.redirect('/admin/login')
            }).catch((err)=>{
                req.flash('error_msg','erro ao atualizar dados')
                res.redirect('/admin')
            })
        } else {
            req.flash('error_msg','Adiministrador não encontrado')
            res.redirect('/admin')
        }
    }).catch((err)=>{
        req.flash('error_msg','Não foi possivel fazer a busca no banco de dados')
        res.redirect('/admin')
    })
})

router.get('/produto/add', eAdmin, (req,res)=>{
    res.render('admin/addProduto')
})

router.post('/produto/add', eAdmin, (req, res) => {
    let erros = [];

    // Middleware para upload de arquivo
    upload.single('foto')(req, res, (err) => {
        if (err) {
            req.flash('error_msg', 'Erro ao fazer upload da foto');
            return res.redirect('/admin/produto/add');
        }

        // Verifica se o arquivo foi enviado
        if (!req.file) {
            erros.push({ texto: 'Nenhum arquivo enviado' });
        } else {
            // Verifica se o arquivo tem uma extensão válida
            const extensaoValida = ['.jpg', '.jpeg'];
            if (!extensaoValida.some(ext => req.file.filename.toLowerCase().endsWith(ext))) {
                erros.push({ texto: 'Arquivo inválido. Apenas JPG e JPEG são permitidos' });
            }
        }

        // Se houver erros, renderiza a página novamente
        if (erros.length > 0) {
            return res.render('admin/addProduto', { erros });
        }

        // Salva os dados no banco de dados
        Produto.create({
            nome: req.body.nome.trim(),
            preco: req.body.preco,
            path_foto: req.file.filename,
            link: req.body.link.trim()
        }).then(() => {
            req.flash('success_msg', 'Produto salvo');
            res.redirect('/admin');
        }).catch((err) => {
            // Remove o arquivo caso ocorra erro no banco
            fs.unlink(req.file.path, (err) => {
                if (err) {
                    console.error('Erro ao tentar remover a foto:', err);
                }
            });
            req.flash('error_msg', 'Erro ao salvar o Produto');
            res.redirect('/admin/produto/add');
        });
    });
});


router.get('/produto/editar/:id', eAdmin, (req,res)=>{
    Produto.findOne({where:{id:req.params.id}}).then((produto)=>{
        if(produto){
            res.render('admin/editProduto', {produto:produto.toJSON()})
        } else{
            req.flash('error_msg','Produto não encontrado')
            res.redirect('/')
        }
    }).catch((err)=>{
        req.flash('error_msg','Produto não encontrado')
        res.redirect('/')
    })
})

router.post('/produto/editar/:id', eAdmin, (req,res)=>{
    Produto.findOne({where:{id:req.params.id}}).then((produto)=>{
        if(produto){
            produto.update({
                nome:req.body.nome,
                preco:req.body.preco,
                link:req.body.link
            }).then(()=>{
                req.flash('success_msg','Atualizado com sucesso')
                res.redirect('/admin')
            }).catch((err)=>{
                req.flash('error_msg','Não foi possivel atualizar os dados')
                res.redirect('/admin')
            })
        } else {
            req.flash('error_msg','Produto não encontrado')
            res.redirect('/admin')
        }
    }).catch((err)=>{
        req.flash('error_msg','Não foi possivel encontrar o produto')
        res.redirect('/admin')
    })
    
})

router.get('/produto/del/:id', eAdmin,(req,res)=>{

    Produto.findOne({where:{id:req.params.id}}).then((produto)=>{
        if(produto){
            res.render('admin/confirmDel', {produto:produto.toJSON()})
        } else {
            req.flash('error_msg','Produto não encontrado')
            res.redirect('/admin')
        }
    }).catch((err)=>{
        req.flash('error_msg','Não foi possivel encontrar o produto')
        res.redirect('/admin')
    })
})

router.post('/produto/confirmDel', eAdmin, (req,res)=>{
    Produto.findOne({where:{id:req.body.id}}).then((produto)=>{
        if(produto){
            console.log(produto)
            fs.promises.rm(path.join(__dirname,`../public/produtos/${produto.toJSON().path_foto}`),{force:true}).then(()=>{
                produto.destroy().then(()=>{
                    req.flash('success_msg','Produto deletado com sucesso')
                    res.redirect('/admin')
                }).catch((err)=>{
                    req.flash('error_msg','Não foi possivel excluir o produto 2')
                    res.redirect('/admin')
                })
            }).catch((err)=>{
                req.flash('error_msg','Erro ao apagar a foto')
                res.redirect('/admin')
            })
        } else {
            req.flash('error_msg','Produto não consta na base de dados')
            res.redirect('/admin')
        }
    }).catch((err)=>{
        req.flash('error_msg','Não foi possivel excluir o produto 1')
        res.redirect('/admin')
    })
})

router.get('/login', (req, res)=>{
    if(req.user){
        res.redirect('/admin')
    } else {
        res.render('admin/login')
    }
})

router.post('/login', (req,res,next)=>{
    passport.authenticate('local', {
        successRedirect:'/admin',
        failureRedirect:'/admin/login',
        failureFlash:true
    })(req,res,next)

})

router.get('/cadastrar' , eAdmin, (req, res)=>{
    res.render('admin/cadastrar')
})

router.post('/cadastrar', eAdmin, (req,res)=>{
    // função que capitaliza as palavras
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    let nome = capitalize(req.body.nome.trim())
    let sobrenome = capitalize(req.body.sobrenome.trim())
    let email = req.body.email.trim().toLowerCase()
    let senha = req.body.senha.trim()
    let senha2 = req.body.senha2.trim()

    // verificando os inputs
    let erros = []

    if(!nome) {
        erros.push({text:'Nome inválido'})
    }
    if(!sobrenome) {
        erros.push({text:'Sobrenome inválido'})
    }
    if(!email) {
        erros.push({text:'E-mail inválido'})
    }
    if(!senha) {
        erros.push({text:'Senha inválida'})
    }
    if(senha !== senha2) {
        erros.push({text:'Senhas não coincidem'})
    }
    if(nome.length < 2) {
        erros.push({text:'Nome muito curto'})
    }
    if(sobrenome.length < 2) {
        erros.push({text:'Sobrenome muito curto'})
    }
    if(senha.length < 8) {
        erros.push({text:'Senha muito curta'})
    }

    if(erros.length >= 1) {
        res.render('/admin/cadastrar', {erros})
    } else {
        User.findOne({where:{email:email}}).then((user)=>{
            if(user){
                req.flash('error_msg','E-mail já em uso')
                res.redirect('/admin/cadastrar')
            } else {
                bcrypt.genSalt(10).then((salt)=>{
                    bcrypt.hash(senha,salt).then((senha)=>{
                        User.create({
                            nome:nome,
                            sobrenome:sobrenome,
                            email:email,
                            senha:senha
                        }).then(()=>{
                            req.flash('success_msg','Usúario criado com sucesso')
                            res.redirect('/admin/cadastrar')
                        }).catch((err)=>{
                            console.log("Erro ao salvar a conta de um usúario no banco de dados, Erro:",err.message)
                            req.flash('error_msg','Erro interno, tente novamente mais tarde')
                            res.redirect('/admin/cadastrar')
                        })
                    }).catch((err)=>{
                        console.log('Erro ao gerar o hash da senha no bcrypt, Erro:',err.message)
                        req.flash('error_msg','Erro interno, tente novamente mais tarde')
                        res.redirect('/admin/cadastrar')
                    })
                }).catch((err)=>{
                    console.log('Erro ao gerar o salt da senha no bcrypt, Erro:',err.message)
                    req.flash('error_msg','Erro interno, tente novamente mais tarde')
                    res.redirect('/admin/cadastrar')
                })
            }
        }).catch((err)=>{
            req.flash('error_msg','Não foi possivel verificar seu E-mail')
            console.log("erro ao verificar o e-mail de um usúario no banco de dados, Erro:",err.message)
            res.redirect('/admin/cadastrar')
        })
    }
})

module.exports = router
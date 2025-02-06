# 📌 Loja para Revendedoras

Bem-vindo ao **Loja para Revendedoras**! 🛍️

Este projeto é uma Loja desenvolvido para facilitar a venda de produtos por revendedoras. Ao clicar em um produto, o usuário é direcionado automaticamente para o **WhatsApp** da revendedora responsável pela venda, garantindo um contato direto e rápido.

---

## 🚀 Funcionalidades

✅ Listagem de produtos disponíveis para venda.  
✅ Ao clicar em um produto, o usuário é redirecionado para o Link ou o WhatsApp da revendedora.  
✅ Interface simples e intuitiva para facilitar a navegação.  

---

## 🛠️ Tecnologias Utilizadas

- **HTML, CSS e JavaScript** para a interface do usuário.  
- **Node.js com Express** para o backend.  
- **Sequelize e MySQL2** para a gestão do banco de dados.  
- **Express-Handlebars** para templates dinâmicos.  
- **Passport e bcryptjs** para autenticação e segurança.  
- **Multer** para upload de arquivos.  
- **Connect-flash e Express-session** para gerenciamento de sessões e mensagens flash.  

---

## 📦 Instalação e Configuração

### 🔹 Requisitos
- Node.js  
- MySQL  

### 🔹 Passos
1. Clone este repositório:
   ```bash
   git clone https://github.com/Tavihh/Site-ComprasComMoni
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```
3. Crie e configure o banco de dados no arquivo `.env` na raiz do projeto:
   ```env
   DB_HOST=localhost
   DB_DATABASE=seu_banco
   DB_USER=seu_usuario
   DB_PASS=sua_senha
   ```
4. Inicie o setup:
   ```bash
   npm run setup
   ```
5. Inicie o servidor:
   ```bash
   npm run start
   ```
## 📜 Como Funciona?
1. O administrador cadastra os produtos no sistema.  
2. Cada produto tem a opção de colocar um **link personalizado**, caso deixe em branco ele redireciona o comprador para o WhatsApp da revendedora.  
3. O usuário escolhe um produto e, ao clicar, abre-se o WhatsApp já com uma mensagem pronta para contato.  

---

## 📌 Contribuição

Contribuições são bem-vindas! Se quiser sugerir melhorias ou reportar problemas, abra uma **issue** ou faça um **pull request**. 😊

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.

📧 **Contato:** [otaviosatago@gmail.com]  
🌐 **Website:** [https://tavihh.github.io/Site-Portfolio]

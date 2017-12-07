/*
  Esse é um servidor de exemplo, que pode ser feito em qualquer linguagem!!!
*/

const Express = require('express')
const App = new Express()
const JWT = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors')
const CHAVESECRETA = 'HOMEMPASSARODOPUDIM123'

// Permite receber: application/json
App.use(bodyParser.json())
// Habilita o CORS
App.use(cors())

App.get('/', (req, res) => {
  res.send(`
    Nada por aqui, tente mandar um "POST"
    com usuario e senha para: <b>https://localhost:4001/login</b>.
  `)
})

App.post('/login', (req, res) => {
  console.log(res.headers)
  const dadosDoUsuario = req.body

  // Checa no banco se o usuário existe
  // Se existir, segue pro passo debaixo
  const nivelDeAcessoDoUsuario = 'admin'
  const token = JWT.sign(
    {
      login: dadosDoUsuario.login,
      senha: dadosDoUsuario.senha,
      accessLevel: nivelDeAcessoDoUsuario
    },
    CHAVESECRETA,
    {
      expiresIn: '2 days'
    }
  )

  res.send(token)
})

App.get('/mensagens', (req, res) => {
  const tokenDoUsuario = req.query['auth-token']
  console.log(tokenDoUsuario)

  if(tokenDoUsuario) {
    JWT.verify(tokenDoUsuario, CHAVESECRETA, function(erro, tokenDecodificado) {
      console.log(tokenDecodificado)
      if(tokenDecodificado) {
        // Pega as mensagens do Banco de Dados, desse usuário "tokenDecodificado.usuario"
        const mensagens = [{content: 'Olá'}, {content: 'tudo bom?'}, {content: 'Esse sistema tem autenticação :)'}]
        res.send(mensagens)
      } else {
        res.send('Esse token é inválido, faça login novamente :(')
      }
    })
  } else {
    res.send('Por favor, sem token, sem mensagens :)')
  }
})

App.listen(4001, () => {
  console.log('Servidor rodando na porta 4001')
})

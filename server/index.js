require('dotenv').config()
const express = require('express')
const app = express()
const sql = require('./db')
const router = require('./router/router')
const routerActiveRouter = require('./router/routerActiveRouter')
const xRouter = require('./router/xRouter')
const cors = require('cors')
const chatRouter = require('./router/chatRouter')
const timerRouter = require('./router/timerRouter')
const winnerRouter = require('./router/winnerRouter')
const squareRouter = require('./router/squareRouter')
const PORT = process.env.PORT || 4000

app.use(cors())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
    });
  
    app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.send();
    });
    

app.use(express.json())
app.use('/', router)
app.use('/active', routerActiveRouter)
app.use('/next', xRouter)
app.use('/chat', chatRouter)
app.use('/time', timerRouter)
app.use('/win', winnerRouter)
app.use('/square', squareRouter)

app.listen(PORT, () => console.log(`Сервер стартовал на ${PORT} порту`))
const connection = async () => {
    try {
        await sql.connect()
        console.log('Подключение прошло успешно')
    } catch(e) {
        console.log(e)
    }
}
connection()
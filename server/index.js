require('dotenv').config()
const express = require('express')
const app = express()
const sql = require('./db')
const router = require('./router/router')
const PORT = process.env.PORT || 4000
app.use(express.json())
app.use('/', router)

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
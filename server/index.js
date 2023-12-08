require('dotenv').config()
const express = require('express')
const app = express()
const sql = require('./db')
const router = require('./router/router')
const cors = require('cors')
const http = require('http');
const PORT = process.env.PORT || 4000
const server = http.createServer(app);
const WebSocket = require('ws');
import pipeline from "./pipeline"

const setupWebSocket = (server) => {
    const wss = new WebSocket.Server({noServer: true})
    pipeline.broadcastPipeline(wss.clients)
    server.on("upgrade", (req, socket, head) => {
        try {
            wss.handleUpgrade(req, socket, head, function done(ws) {
                wss.emit("connection", ws, req)
            })
        } catch (err) {
            console.log("upgrade exception", err);
            socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
            socket.destroy();
            return;
        }
    })
    wss.on("connection", (ctx) => {
        console.log("connected", wss.clients.size)

        ctx.on("message", (message) => {
            console.log(`Recived message => ${message}`)
            ctx.send(`your said ${message}`)
        })
        ctx.on("close", () => {
            console.log("closed", wss.clients.size)
        })
        ctx.send(`connection established ${wss.clients.size}`)
    })
}

app.use(express.json())
app.use('/', router)
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
    

server.listen(PORT, () => console.log(`Сервер стартовал на ${PORT} порту`))
const connection = async () => {
    try {
        await sql.connect()
        console.log('Подключение прошло успешно')
    } catch(e) {
        console.log(e)
    }
}
setupWebSocket(server)
connection()
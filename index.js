const express = require('express')
const mongo_db = require('./db.js')
var path = require('path')

const SERVICE_PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json());


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/index.html'))
})

app.get('/js/:script', function(req, res) {
    res.sendFile(path.join(__dirname + '/html/' + req.params.script))
})

app.post('/destinations', function(req, res) {
    const req_body = req.body

    if (!('latitude' in req_body) || !('longitude' in req_body)) {
        res.send(JSON.stringify({
            'status': 'error',
            'message': "Missing required params: longitude, latitude"
        }))
    }

    const latitude = req_body.latitude
    const longitude = req_body.longitude

    var type = undefined
    if ('type' in req_body) {
        type = req_body.type
    }

    res.set('Content-Type', 'application/json');

    mongo_db.dbConnect()
        .then((c) => {
            clientvar = c.client;
            return mongo_db.dbGetPointsWithinRange(clientvar, latitude, longitude, type)
        }).then((i) => {
            cvar = i.client
            i.points.toArray((err, items) => {
                res.send(JSON.stringify({'points': items}))
            })
    }).catch((err) => {
        console.log(err)
    })
})


app.listen(SERVICE_PORT, () => {
    console.log(`Server is listening on port ${SERVICE_PORT}`);
});



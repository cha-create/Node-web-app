const { json } = require('body-parser');
const express = require('express');
const app = express();
const Datastore = require('nedb');
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(3000, () => console.log("listening on port 3000"));

const database = new Datastore('database.db');
database.loadDatabase();


app.post('/api', (request, response) => {
    console.log('post request received');
    const data = request.body;
    const lat = data.lat;
    const lon = data.lon;
    const name = data.name;
    console.log(name);
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);

    response.json({
        status: 'success',
        receivedLatitude: lat,
        receivedLongitude: lon,
        timestamp: timestamp,
        receivedName: name

    })
})

app.post('/api/query', (request, response) => {
    console.log('query request received');
    const data = request.body;
    const query = data.name;
    console.log(query);

    database.find({ name: `${query}` }, (err, data) => {
        if (err) {
            response.end();
            return;
        }
        console.log(`Response sent. Contents: ${JSON.stringify(data)}`);
        response.json({ receivedQuery: query, queriedObjects: data });
    })
})

app.get('/api/get', (request, response) => {
    console.log("database request received");
    database.find({}, (err, data) => {
        if (err) {
            response.end();
            console.log(err);
        }
        response.json(data);
    })


})
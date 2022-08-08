const express = require('express');
const app = express();
const Datastore = require('nedb');
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(3000, () => console.log("listening on port 3000"));

const database = new Datastore('database.db');
database.loadDatabase();


app.post('/api', (request, response) => {
    console.log('request received');
    const data = request.body;
    const lat = data.lat;
    const lon = data.lon;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);

    response.json({
        status: 'success',
        receivedLatitude: lat,
        receivedLongitude: lon,
        timestamp: timestamp

    })
})
const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));
app.listen(3000, () => console.log("listening on port 3000"));


app.post('/api', (request, response) => {
    console.log("Request Received");
    const data = request.body;
    console.log(data);


    response.json({
        status: 'success',
        receivedLatitude: data.lat,
        receivedLongitude: data.lon
    })
})
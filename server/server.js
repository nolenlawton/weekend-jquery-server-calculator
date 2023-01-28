const express = require('express')
const bodyParser = require('body-parser')

const app = express();
app.use(express.static('server/public'))
app.use(bodyParser.urlencoded({extended:true}))

const PORT = 5000
app.listen(PORT, () => {
    console.log('INTERNET! PORT: 5000')
});

const calculations = []

app.post('/guesses', (request, response) => {

    let dataObject = request.body;
    calculations.push(dataObject); 
    response.sendStatus(201);

})

app.get('/guesses', (request, response) => {

     
    response.send(calculations);

})
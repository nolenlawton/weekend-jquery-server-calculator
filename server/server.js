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
    console.log(dataObject)

    let total = calculation(dataObject)
    // console.log(total)

    response.sendStatus(201);
})

app.get('/guesses', (request, response) => {

    // console.log(calculations)
    response.send(calculations);
})

function calculation(object) {
    console.log(object.number1 + ' '+ object.operator + ' ' + object.number2)

    if(object.operator === '+'){
        console.log('add')
    }
    else if(object.operator === '-'){
        console.log('subtract')
    }
    else if(object.operator === 'x'){
        console.log('multiply')
    }
    else if(object.operator === '/'){
        console.log('divide')
    }
}

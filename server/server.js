const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended:true}));

const PORT = 5000
app.listen(PORT, () => {
    console.log('INTERNET! PORT: 5000');
});

let calculations = []

app.post('/calculation', (request, response) => {

    let dataObject = request.body;
    calculations.push(dataObject); 
    
    let total = calculation(dataObject);

    console.log(Number(dataObject.number1) + ' ' + dataObject.operator + ' ' + Number(dataObject.number2) + ' = ' + total)

    response.sendStatus(201);
})

app.get('/calculation', (request, response) => {

    response.send(calculations);
})

app.delete('/calculation', (request, response) => {

    console.log(calculations)

    calculations = []

    console.log(calculations)

    response.send(calculations);
})

function calculation(object) {
    
    let number1 = Number(object.number1);
    let operator = object.operator;
    let number2 = Number(object.number2);
    let total;

    if(operator === '+'){
        total = number1 + number2;
    }
    else if(operator === '-'){
        total = number1 - number2;
    }
    else if(operator === 'x'){
        total = number1 * number2;
    }
    else if(operator === '/'){
        total = number1 / number2;
    }

    object.total = total

    return total
}

